/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Sidebar from './sideBar';
import NavBar from './Navbar';
import BackImage from '../src/foodbank-images/back-icon.png'
import cartMockupImage from '../src/foodbank-images/cart-mockup.png'
import { useUser } from './UserContext';

export default function Store() {
    const { userInfo } = useUser();
    const history = useNavigate();
    const userId = sessionStorage.getItem('userId');
    const userToken = sessionStorage.getItem('userToken');

    const [sideBarShow, setSideBarShow] = useState(false);


    const [tabOne, settabOne] = useState(true);
    const [tabTwo, settabTwo] = useState(false);

    function removeTabOne() {
        settabOne(false)
        settabTwo(true)
    }
    function removeTabTwo() {
        settabOne(true)
        settabTwo(false)
    }

    const [availableItems, setavailableItems] = useState(true);
    const [allAvailableItems, SetAllAvailableItems] = useState([]);
    const [availableItem, setavailableItem] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);

    const fetchProductDetails = async (productId) => {
        try {
            const response = await axios.get(`https://api.sovereigntechltd.com/api/v1/product/${productId}`);
            setSelectedProduct(response.data);
        } catch (error) {
            console.error('Error fetching product details:', error);
        }
    };

    function selectedItem(productId) {
        setavailableItem(true)
        setavailableItems(false)
        fetchProductDetails(productId);
    }

    function backAvail() {
        setavailableItems(true)
        setavailableItem(false)
    }

    const [IqValue, setIqValue] = useState(1)
    const [totalPrice, setTotalPrice] = useState(0);
    const addVal = () => {
        setIqValue((prevValue) => prevValue + 1);
    };
    const subVal = () => {
        setIqValue((prevValue) => Math.max(1, prevValue - 1));
    };

    useEffect(() => {
        // Update the total price whenever the quantity or selectedProduct changes
        if (selectedProduct) {
            setTotalPrice(selectedProduct.price * IqValue);
        }
    }, [IqValue, selectedProduct]);

    const [addToCartModal, setaddToCartModal] = useState(false)

    const fetchAvailableItems = async () => {
        try {
            const response = await axios.get('https://api.sovereigntechltd.com/api/v1/product');
            SetAllAvailableItems(response.data);

        } catch (error) {
            console.error('Error fetching available items:', error);
        }
    };

    useEffect(() => {
        fetchAvailableItems();
    }, []);

    const handleAddToCart = async () => {
        try {
            const response = await axios.post('https://api.sovereigntechltd.com/api/v1/cart/addToCart', {
                userId: userId,
                name: selectedProduct.name,
                image: selectedProduct.image,
                measurement: selectedProduct.measurement,
                type: selectedProduct.type,
                totalPrice: totalPrice,
                quantity: IqValue,
            });

            if (response.status === 200) {
                // Successfully added to cart, you can perform any additional actions here
                setaddToCartModal(true);
            } else {
                console.error('Error adding to cart:', response.data.message);
            }
        } catch (error) {
            console.error('Error adding to cart:', error);
        }
    };
    const [cartItems, setCartItems] = useState([]);
    const fetchCartItems = async () => {
        try {
            const response = await axios.get('https://api.sovereigntechltd.com/api/v1/cart/getCartItems', {
                params: {
                    userId: userId,
                },
            });

            if (response.status === 200) {
                // Set cartItems state with the fetched data
                setCartItems(response.data.items);
            } else if (response.status === 404) {
                // Handle the case where no cart items were found
                console.log('Cart is empty');
            }
        } catch (error) {
            // Handle any errors that occur during the request
            console.error('Error fetching cart items:', error);
        }
    };

    useEffect(() => {
        // Call the function to fetch cart items when the component mounts
        fetchCartItems();
    },);


    const [latestPaymentSummary, setLatestPaymentSummary] = useState(null);

    const fetchLatestPaymentSummary = async () => {
        try {
            const response = await axios.get('https://api.sovereigntechltd.com/api/v1/admin/getPaymentChargesSummary');

            const sortedData = response.data.sort((a, b) => new Date(b.date) - new Date(a.date));

            // Select the first item (latest) from the sorted data
            const latestItem = sortedData[0];

            const latestValues = {
                serviceFee: latestItem.serviceFee,
                vat: latestItem.vat,
                deliveryFee: latestItem.deliveryFee,
            };

            setLatestPaymentSummary(latestValues);
        } catch (error) {
            console.error('API request failed', error);
        }
    };

    useEffect(() => {
        // Fetch data from the API when the component mounts
        fetchLatestPaymentSummary();
    }, []);

    // Calculate the total price of all cart items
    const totalItemsPrice = cartItems.reduce((total, cartItem) => total + cartItem.totalPrice, 0);

    const sampleSummary = latestPaymentSummary
        ? [
            { value: 'Total items price', price: ` ${totalItemsPrice}` },
            { value: 'Service fee', price: `${latestPaymentSummary.serviceFee}` },
            { value: 'VAT', price: `${latestPaymentSummary.vat}` },
            { value: 'Interest', price: `${(3 / 100) * totalItemsPrice}` },
            { value: 'Delivery fee', price: `${latestPaymentSummary.deliveryFee}` },
        ]
        : [];

    const overallTotal = sampleSummary.reduce((total, item) => {
        const price = parseFloat(item.price.replace(/[^0-9.]/g, '')); // Remove non-numeric characters
        return total + price;
    }, 0);

    const sampleSummary_ = latestPaymentSummary
        ? [
            { value: 'Service fee', price: `${latestPaymentSummary.serviceFee}` },
            { value: 'VAT', price: `${latestPaymentSummary.vat}` },
            { value: 'Interest', price: `${(3 / 100) * totalItemsPrice}` },
            { value: 'Delivery fee', price: `${latestPaymentSummary.deliveryFee}` },
        ]
        : [];

    const handleProceed = () => {
        history('/TransactionChain1', { state: { userId, totalItemsPrice, overallTotal, sampleSummary_ } })
    }

    return (
        <div className='dashboard'>
            <NavBar setSideBarShow={setSideBarShow}  removeTabOne={removeTabOne}/>
            <div className="dashboard-space">
                <Sidebar sideBarShow={sideBarShow} setSideBarShow={setSideBarShow} />
                <div className="major-container">
                    <header className="mj-heading">
                        <span className="back-btn">
                            <img src="foodbank-images/back-icon.png" className='back-btn-image' alt="" />
                        </span>
                        <span className={`mjh-btn mjhb1 ${tabOne ? "activate-btn" : "inactive-btn"}`} onClick={removeTabTwo}>
                            Available items
                        </span>
                        <span className={`mjh-btn mjhb2 ${tabTwo ? "activate-btn" : "inactive-btn"}`} onClick={removeTabOne}>
                            My cart
                        </span>
                    </header>
                    {tabOne ? (<section className="available-items-tab">
                        {availableItems ? <div className="available-items-space">
                            {allAvailableItems.map((item) => (
                                <div className='available-item' key={item.id} onClick={() => selectedItem(item._id)}>
                                    <img src={item.image} alt={item.name} />
                                    <p>{item.name}</p>
                                </div>
                            ))}
                        </div> : null}
                        {availableItem ? <div className="selected-item-space">
                            <a href=""> <p className='sub-back-btn' onClick={backAvail}>
                                Back
                            </p></a>
                            <section className="sis-item-view">
                                <div className="main-view-space">
                                    {selectedProduct && <img src={selectedProduct.image} alt={selectedProduct.name} />}
                                </div>
                                <div className="item-images">
                                    {Array.from({ length: 4 }).map((_, index) => (
                                        <span key={index}>
                                            {selectedProduct && <img src={selectedProduct.image} alt={selectedProduct.name} />}
                                        </span>
                                    ))}
                                </div>
                            </section>
                            <section className="sis-item-detail">
                                {selectedProduct && <h2>{selectedProduct.name}</h2>}

                                {selectedProduct && <p className='texxt'>
                                    {selectedProduct.type}
                                </p>}
                                <div className="sis-detail-items">
                                    {selectedProduct && <span>{selectedProduct.measurement}</span>}
                                    {/* <span>2 Litres</span>
                                    <span>5 Litres</span>
                                    <span>Small grain</span>
                                    <span>Long grain</span> */}
                                </div>
                                <div className="item-quantity">
                                    <div className="iq-size">
                                        <span className="iq-sub-btn" onClick={subVal}>-</span>
                                        <p className="iq-value">{IqValue}</p>
                                        <span className="iq-add-btn" onClick={addVal}>+</span>
                                    </div>
                                    <div className="item-amount">
                                        <p>Total price of Item</p>
                                        {selectedProduct && <p>&#8358; {totalPrice}</p>}
                                    </div>
                                </div>
                                <div className="reg-form-btn" onClick={handleAddToCart}>
                                    <img src="foodbank-images/cart-bag-icon.png" alt="" />
                                    <p>Add to cart</p>
                                </div>
                            </section>
                        </div> : null}
                    </section>) : null}
                    {tabTwo ? (
                        <section className="my-cart-tab">
                        {
                            cartItems.length > 0 ? (
                                <section className="my-cart-tab">
                                    <div className="my-cart-space">
                                        <section className="mcs-1">
                                            <p className="mcs-subheading">
                                                Today
                                            </p>
                                            <div className="order-items">
                                                {cartItems.map((item) => (
                                                    <section key={item.id} className="order-item">
                                                        <div className="oi-side1">
                                                            <figure>
                                                                <img src={item.image} alt={item.name} />
                                                            </figure>
                                                            <div className="oi-side1-details">
                                                                <p>{item.name}</p>
                                                                <p>{item.quantity}</p>
                                                                <p>&#8358; {item.totalPrice}</p>
                                                            </div>
                                                        </div>
                                                        <div className="oi-side2">
                                                            <img src="foodbank-images/trash.png" alt="" />
                                                        </div>
                                                    </section>
                                                ))}
                                            </div>
                                        </section>
                                        <section className="mcs-2">
                                            <p className="mcs-subheading">
                                                Payment Summary
                                            </p>
                                            <div className="order-payment-summary">
                                                <section className="payment-summary-description">
                                                    {sampleSummary.map((item, index) => (
                                                        <span key={index}>
                                                            <p className='psd-detail'>{item.value}</p>
                                                            <p className='psd-price'>&#8358; {item.price}</p>
                                                        </span>
                                                    ))}
                                                    <hr className='psd-hr' style={{ minWidth: '70%' }} />
                                                    <span className="psd-total">
                                                        <p className='psd-detail'>Overall Total</p>
                                                        <p className='psd-price'>&#8358; {overallTotal}</p>
                                                    </span>
                                                </section>
                                            </div>
                                        </section>
                                    </div>
                                    <a onClick={handleProceed} href="" className='reg-form-btn'>
                                        Proceed
                                    </a>
                                </section>
                            ) : (
                                <section className="empty-history-space">
                                    <img src={cartMockupImage} alt="" />
                                    <h3>No items in the cart</h3>
                                    <p>Lorem ipsum dolor sit amet consectetur...</p>
                                    <a href="#">Shop Now</a>
                                </section>
                            )
                        }
                        </section>
                    ) : null}
                </div>
            </div>
            {addToCartModal ? <div className="verification-modal-bg" onClick={() => { setaddToCartModal(false) }}>
                <div className="otp-verification-modal">
                    <img src="foodbank-images/check-img.png" alt="" className="otp-check-pic" />
                    <h2>
                        Item Added
                    </h2>
                    <p>
                        Success! Your order is now in your cart, ready for checkout.
                    </p>
                    <a href="#" onClick={removeTabOne}>
                        Go to cart
                    </a>
                </div>
            </div> : null}
        </div>
    )
}
