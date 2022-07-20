import '../App.css';
import Footer from './Footer';
import Header from './Header';
import Subscribe from './Subscription'
import Crypto from './CryptoFeeds';

export default function Contact() {
    return(
      <div>
      <Header/>
        <section id="contact" class="contact section-bg">
        <div class="container">
  
          <div class="section-title">
            <h2>Contact Us</h2>
          </div>
  
          <div class="row justify-content-center">
  
           
  
            <div class="col-lg-5 col-md-7">
              <form action="forms/contact.php" method="post" role="form" class="php-email-form">
                <div class="form-group">
                  <input type="text" name="name" class="form-control" id="name" placeholder="Your Name" required></input>
                </div>
                <div class="form-group mt-3">
                  <input type="email" class="form-control" name="email" id="email" placeholder="Your Email" required></input>
                </div>
                <div class="form-group mt-3">
                  <input type="text" class="form-control" name="subject" id="subject" placeholder="Subject" required></input>
                </div>
                <div class="form-group mt-3">
                  <textarea class="form-control" name="message" rows="5" placeholder="Message" required></textarea>
                </div>
                <div class="my-3">
                  <div class="loading">Loading</div>
                  <div class="error-message"></div>
                  <div class="sent-message">Your message has been sent. Thank you!</div>
                </div>
                <div class="text-center"><button type="submit">Send Message</button></div>
              </form>
            </div>
  
          </div>
  
        </div>
      </section>
      <Subscribe/>
      <Crypto/>
      <Footer/>
      </div>
    );
}