import React from 'react';
import { useEffect } from 'react';
import Footer from './components.jsx/Footer';
import { Link } from 'react-router-dom';
import { useTypewriter, Cursor } from 'react-simple-typewriter';
import AOS from "aos";
import "aos/dist/aos.css";
import NavBar from './Navbar';

export default function Landingpage() {

  const [text] = useTypewriter({
    words: ['Get food items from foodbank at affordable prices'],
  })

  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);

  return (
    <>
        <NavBar/>
          <header className="lp-header">
            <h1 className='header-subheading'>
              {text}
            </h1>
            <p className="header-text" data-aos="fade-up">
              Lorem ipsum dolor sit amet consectetur. Amet at pulvinar arcu est nibh. Sit tellus sed fermentum nullam et mattis scelerisque.
            </p>
            <div className="lp-header-links" data-aos="fade-up">
              <Link to={'/'}><p>Sign in</p></Link>
              <Link to={'/'}><p>Get started</p></Link>
            </div>
          </header>
          <img src='foodbank-images/home-deliveries-make-staying-home-so-much-easier-shot-masked-young-man-delivering-fresh-produce-customer-home 1.png' className="after-header-image" data-aos="fade-down"/>

          <div className="second-subheading-space">
            <h2 className='second-subheading' data-aos="fade-up">
              Get food items from foodbank at affordable prices
            </h2>
            <p className="header-text" data-aos="fade-up">
                Lorem ipsum dolor sit amet consectetur. Amet at pulvinar arcu est nibh. Sit tellus sed fermentum nullam et mattis scelerisque.
            </p>
          </div>
          <main className="lp-grid-container">
            <section data-aos="fade-up">
              <h2>
                Select food items
              </h2>
              <p>
                Take your pick from our delectable food selection.
              </p>
            </section>
            <section data-aos="fade-right">
              <h2>
                Complete the payment
              </h2>
              <p>
                Finalize your purchase by securely submitting your payment.
              </p>
            </section>
            <section data-aos="fade-left">
              <h2>
                Receive your order.
              </h2>
              <p>
                Your eagerly awaited package is on its way to you!
              </p>
            </section>
          </main>
          <div className="last-content-space" data-aos="fade-up">
            <div className="lcs-circle"></div>
            <h2>
              Join the waitlist
            </h2>
            <p className='lcs-text'>
              Finalize your purchase by securely submitting your payment.
            </p>
            <Link to={'/'}>
              <p>Suscribe to Newsletter</p>
            </Link>
          </div>
        <Footer/>
    </>
  )
}
