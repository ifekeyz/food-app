import React, { useState, useEffect } from 'react';
import Phonebg from './Phonebg_space';
import "../src/foodbank-css/Registration.css";
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Reg2() {
  const [register, setregister] = useState(false);
  const [companies, setCompanies] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState('');
  const [loading, setLoading] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  const userId = location.state && location.state.id;

  const [formData, setFormData] = useState({
    phoneNumber: '',
    homeAddress: '',
    company: '',
    jobTitle: '',
    salary: '',
    staffId: '',
    image: null,
  });

  useEffect(() => {
    // Fetch companies when the component mounts
    const fetchCompanies = async () => {
      try {
        const response = await fetch('https://api.sovereigntechltd.com/api/v1/admin/getAllCompany');
        const data = await response.json();
        setCompanies(data);
      } catch (error) {
        console.error('Error fetching companies:', error);
      }
    };

    fetchCompanies();
  }, []); // Empty dependency array ensures the effect runs only once on mount

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      image: e.target.files[0],
    });
  };

  const handleSubmit = async () => {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));

    try {
      const apiUrl = `https://api.sovereigntechltd.com/api/v1/users/${userId}`;

      const data = new FormData();
      data.append('phonenumber', formData.phoneNumber);
      data.append('address', formData.homeAddress);
      data.append('company', selectedCompany);
      data.append('jobtitle', formData.jobTitle);
      data.append('salary', formData.salary);
      data.append('staffId', formData.staffId);
      data.append('image', formData.image);

      const response = await fetch(apiUrl, {
        method: 'PUT',
        body: data,
      });

      if (response.status === 200) {
        // Handle success, e.g., redirect to another page
        console.log('User data updated successfully');
        const walletApiUrl = `https://api.sovereigntechltd.com/api/v1/wallet/createWallet`;
        const walletData = {
            userId: userId
        };

        const walletResponse = await axios.post(walletApiUrl, walletData);

        if (walletResponse.status === 200) {
            // Wallet creation succeeded
            navigate('/Login');
            alert('Proceed to make your own time payment, You can now login');
            
        } else {
            // Wallet creation failed
            console.error('Wallet creation failed');
        }
        
      } else {
        // Handle error, e.g., display an error message
        console.error('Failed to update user data');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }finally{
      setLoading(false)
    }
  };

  return (
    <main className="reg-main">
      <div className="reg-form-space">
        <img src="foodbank-images/foodbank-logo.png" alt="" className="reg-logo" />
        <h2 className="registration-subheading">
          Almost done!
        </h2>
        <p className="regristration-descriptive-text">
          You're just a step away from unlocking all the benefits!
        </p>
        <form className="registration-form" enctype="multipart/form-data">
          <section className='reg-setup-section'>
            <label htmlFor="">
              Phone number
            </label>
            <input
              type="text"
              placeholder='+234'
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleInputChange}
            />
          </section>
          <section className='reg-setup-section'>
            <label htmlFor="">
              Home address
            </label>
            <input
              type="text"
              placeholder='Enter your home address here'
              name="homeAddress"
              value={formData.homeAddress}
              onChange={handleInputChange}
            />
          </section>
          <section className="reg-setup-section">
            <label htmlFor="">Company</label>
            {companies.length > 0 ? (
              <select
                name="company"
                id="company"
                value={selectedCompany}
                onChange={(e) => setSelectedCompany(e.target.value)}
              >
                <option value="" selected disabled>
                  Select a company
                </option>
                {companies.map((company) => (
                  <option
                    key={company.id}
                    value={company.companyName}
                  >
                    {company.companyName}
                  </option>
                ))}
              </select>
            ) : (
              <p>Loading companies...</p>
            )}
          </section>
          <section className='reg-setup-section'>
            <label htmlFor="">
              Job title
            </label>
            <input
              type="text"
              placeholder='Enter your job role here'
              name="jobTitle"
              value={formData.jobTitle}
              onChange={handleInputChange}
            />
          </section>
          <section className='reg-setup-section'>
            <label htmlFor="">
              Staff Id
            </label>
            <input
              type="text"
              placeholder='Enter your staff Id'
              name="staffId"
              value={formData.staffId}
              onChange={handleInputChange}
            />
          </section>
          <section className='reg-setup-section'>
            <label htmlFor="">
              Profile Image
            </label>
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleFileChange}
            />
          </section>
          <section className='reg-setup-section'>
            <label htmlFor="">
              Salary
            </label>
            <input
              type="text"
              placeholder='Enter your Salary here'
              name="salary"
              value={formData.salary}
              onChange={handleInputChange}
            />
          </section>
          {loading && (
            <div className="preloader-overlay">
              <div className="preloader"></div>
            </div>
          )}
          <div className='reg-form-btn' onClick={handleSubmit} disabled={loading}>Continue</div>
        </form>
      </div>
      <Phonebg></Phonebg>
      {register ? <div className="verification-modal-bg" onClick={() => { setregister(false) }}>
        <div className="otp-verification-modal">
          <img src="foodbank-images/check-img.png" alt="" className="otp-check-pic" />
          <h2>
            Registration completed
          </h2>
          <p>
            Success! Your registration has been completed.
          </p>
          <a href="#" onClick={() => { setregister(false) }}>
            Continue to dashboard
          </a>
        </div>
      </div> : null}
    </main>
  )
}
