import '../App.css';
import discord from '../img/discord.png'

export default function Footer() {
  return (
    <footer id="footer">
     <a target = '_blank' href='https://discord.gg/vB6qQK4FTZ'> <img className='discord_social center' alt="discord image" src ={discord}></img></a>
       <div className="social-links">
        <a href="https://facebook.com/" class="fa fa-facebook  social_icon"></a>
        <a href="https://twitter.com/" class="fa fa-twitter"></a>
        <a href="https://instagram.com" class="fa fa-instagram"></a>
        <a href="https://linkedin.com/" class="fa fa-linkedin"></a>
        {/* <a href="https://linkedin.com/" class="fa fa-discord"></a> */}


      </div> 
    <div class="container">
  
      <div class="copyright">
        &copy; Copyright <strong><span>Wicked Designs</span></strong>. All Rights Reserved
      </div>
    
      <div class="credits">
        Designed by <a href="https://bootstrapmade.com/">Wicked Designs</a>

        <div className="info">
             
                <p></p>
                <p>info@example.com</p>          
                <p></p>
              
            </div>
      </div>
    </div>
  </footer>
  );}