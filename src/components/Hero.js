import '../App.css';
import logo from "../img/e.d.b-LOGO.png"

export default function Hero() {
  return (
<section id="hero" >
    <div className='hero_title'>
       <img className="hero_logo"src={logo}></img>  
       <div className='hero_text'>
       <p className='orange_neon'>ETH-DERO Bridge</p>
       <button className=" border enableEthereumButton d-flex btn btn-dark d-grid gap-2 d-md-block">Connect MetaMask</button>
        </div>  
      </div>
   </section>

  );}



