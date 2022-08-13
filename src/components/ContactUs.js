import '../App.css'
import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { contactConfig } from './content_option'
import Footer from './Footer'
import Header from './Header'
import Subscribe from './Subscription'
import Crypto from './CryptoFeeds'

export default function Contact() {
  return (
    <div>
      <Header />
      <section id="contact" class="contact section-bg">
        <div class="container">
          <div class="section-title">
            <h2>Contact Us</h2>
          </div>
          <Row className="sec_sp">
            <Col lg="5" className="mb-5">
              <h3 className="color_sec py-4">Get in touch</h3>
              <address>
                <strong>Email:</strong>{' '}
                <a href={`mailto:${contactConfig.YOUR_EMAIL}`}>
                  {contactConfig.YOUR_EMAIL}
                </a>
                <br />
                <br />
              </address>
              <p>{contactConfig.description}</p>
            </Col>
            <Col lg="7" className="d-flex align-items-center">
              <form className="contact__form w-100">
                <Row>
                  <Col lg="6" className="form-group">
                    <input
                      className="form-control"
                      id="name"
                      name="name"
                      placeholder="Name"
                      type="text"
                      required
                    />
                  </Col>
                  <Col lg="6" className="form-group">
                    <input
                      className="form-control rounded-0"
                      id="subject"
                      name="subject"
                      placeholder="Subject"
                      type="text"
                      required
                    />
                  </Col>
                </Row>
                <textarea
                  className="form-control rounded-0"
                  id="message"
                  name="message"
                  placeholder="Message"
                  rows="5"
                  required
                ></textarea>
                <br />
                <Row>
                  <Col lg="12" className="form-group">
                    <a
                      className="neon_btn"
                      href={`mailto:${contactConfig.YOUR_EMAIL}?subject=subject &body=message`}
                    >
                      Send Message
                    </a>
                  </Col>
                </Row>
              </form>
            </Col>
          </Row>
        </div>
      </section>
      {/* <Subscribe/> */}
      <Crypto />
      <Footer />
    </div>
  )
}
