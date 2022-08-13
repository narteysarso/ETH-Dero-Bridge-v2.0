import '../App.css';
import ebd_logo from "../img/e.d.b-LOGO.png"
import Trenton from "../img/Trenton.png"
import peter from "../img/peter.png"
import moonstar from '../img/moonstar.png'
import Header from './Header';
import Footer from './Footer'; 
import Crypto from './CryptoFeeds';

export default function About() {
  return (
    <div>
      <Header/>
      <div>
    <div class="container-mission">
    <div class="section-title">
            <h2>Our Mission</h2>
      <div className="mission-statement" >
      <p>Our mission is too bring an element of privacy not possible on Ethereum and other public blockchains, i.e., Private Smart Contracts.</p>
      <p>This Ethereum-DERO bridge allows Ethereum users to use their assets on Ethereum with the DERO platform as a completely permissionless platform.</p>
      </div>
          </div>
    
  
    
      
    
  </div>



<div class="container-pro">
<div class="section-title">
            <h2>Our Team</h2>
          </div>

  <div class="profiles ">
  <div class="profile">
 
  <a target="_blank" href='https://twitter.com/CryptoEscondido'>  <img src={Trenton} class="profile-img"></img></a>
      <div>
      <h3 class="className">Tenton Gaddis</h3>
      <h5>Project Creator</h5>
      <p>Trenton won a prize in the 2020 Solana Hackathon and has focused on ETHGlobal Hackathons in 2021, 
        winning at least 13 prizes along with his team but in 2022 he would very much like to solve the privacy & 
        censorship issuses in the Ethereum Ecosystem via our Ethereum-DERO bridge. </p>
      </div>
       </div>

       <div class="profile">
       <a target="_blank" href='https://twitter.com/02b2YBH'>  <img src={peter} class="profile-img"></img></a>
    
      <div>
      <h3 className="user-name">Peter Patrick</h3>
      <h5>Dev Team</h5>
      <p>Peter is relativley new to the web3 space, having come from web2 SOC1 and web2 pentesting.
         He is now involved deeply with web3 cyber-security auditing and full stack development.
         This project marks his entrance into the web3 development arena with more project already on the horizon.
      </p>
      </div>
      
       </div>
       
       <div class="profile">
     <a target="_blank" href='https://www.linkedin.com/in/sonyy/'><img src={moonstar} class="profile-img"></img></a> 
      <div>
      <h3 className="user-name">Sony</h3>
      <h5>Developer</h5>
      <p>Sony is a full-stack software developer. She is transcending from web2 to web3 exploring technologies and projects that can have a considerable impact on Web Security and Privacy.</p>
      </div>
       </div>
    
  </div>

  <div class="profiles ">
  <div class="profile">
      <img src={ebd_logo} class="profile-img"></img>
      <div>
      <h3 class="user-name">John</h3>
      <h5>Role</h5>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
      </div>
       </div>

       <div class="profile">
      <img src={ebd_logo} class="profile-img"></img>
      <div>
      <h3 class="user-name">John</h3>
      <h5>Role</h5>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
      </div>
      
       </div>
    
  </div>
</div>
</div>
<Crypto/>
      <Footer/>
    </div>
    
  );}