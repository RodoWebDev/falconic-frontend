import React from 'react';
import Service1 from '../assets/imgs/bottom_logo.png';
import { Form, Button } from 'react-bootstrap';
import { FaPhoneAlt, FaFacebookSquare, FaTwitterSquare, FaInstagramSquare } from 'react-icons/fa'
import './styles.scss'

const Footer = () => {

  return (
    <div className="footer">
      <img src={Service1} className="footer_img" alt="Footer_img" />
      <div className="container">
        <h1>Get in Touch</h1>
        <div className="row">
          <div className="col-lg-4">
            <p className="sub_title">Subscribe</p>
            <div className="subscribe_section">
              <Form.Control type="email" placeholder="Email" />
              <Button variant="secondary">Subscribe</Button>
            </div>
          </div>
          <div className="col-lg-2 col-6">
            <p className="sub_title">Call</p>
            <div className="subscribe_section">
              <FaPhoneAlt className="phone" />
              <div className="phones">
                <p className="phone_number">+971 4 368 0833</p>
                <p className="phone_number">+971 4 455 8556</p>
              </div>
            </div>
          </div>
          <div className="col-lg-2 col-6">
            <p className="sub_title">Social</p>
            <div className="subscribe_section">
              <div className="social">
                <FaFacebookSquare className="phone" />
                <FaTwitterSquare className="phone" />
                <FaInstagramSquare className="phone" />
              </div>
            </div>
          </div>
          <div className="col-lg-2 col-6">
            <p className="sub_title">Apps</p>
            <div className="lists">
              <p className="list">App Store</p>
              <p className="list">Google Play</p>
              <p className="list">Huawei App Gallery</p>
            </div>
          </div>
          <div className="col-lg-2 col-6">
            <p className="sub_title">Company</p>
            <div className="lists">
              <p className="list">About us</p>
              <p className="list">Careers</p>
              <p className="list">Press Releases</p>
              <p className="list">Download Centre</p>
              <p className="list">Service Promise</p>
            </div>
          </div>
        </div>
        <p className="company_info">Falconic © 2023 by ISAP Solutions</p>
      </div>
    </div>
  )
}

export default Footer
