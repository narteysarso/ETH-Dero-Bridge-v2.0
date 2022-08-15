import '../App.css';
import dero from '../img/dero.png'
import polygonLogo from '../img/polygon.png';
import ethLogo from '../img/eth.png';
import bridge from '../img/bridge.gif';
import arrow from '../img/Down-Arrow-gif.webp';
const {abi : EthBridgeAbi, address: EthBridgeAddress} = require("../abis/EthBridge.json");

export default function BridgeForm({account}) {
  return (
<div class="container-bridge">
   <div class="section-title">
  <h2>ETH Dero Bridge TX</h2>
</div>
<div className='bridge_tx'>
<ul class="faq-list">
<li>
    <a data-bs-toggle="collapse" class="collapsed" data-bs-target="#faq1">Ethereum Account Address<i class="bx bx-down-arrow-alt icon-show"></i><i class="bx bx-x icon-close"></i></a>
    <div className='bridge_box gradient-border collapse' id="faq1"  data-bs-parent=".faq-list">
      <p >
        ETH Address: <span class="showAccount">{account}</span>
      </p>
    </div>
  </li>

  <li>
    <a data-bs-toggle="collapse" data-bs-target="#faq3" class="collapsed">Bridge Contract Address <i class="bx bx-down-arrow-alt icon-show"></i><i class="bx bx-x icon-close"></i></a>
    <div  className='bridge_box gradient-border collapse'id="faq3"  data-bs-parent=".faq-list">
      <p>
        Bridge Contract Address <span class="showContract">{EthBridgeAddress}</span>
      </p>
      <p>
        Bridge Fee : <span class="showFee">TBD</span>
      </p>
    </div>
  </li>
  <li>
  <a data-bs-toggle="collapse" data-bs-target="#faq4" class="collapsed">Token Details<i class="bx bx-down-arrow-alt icon-show"></i><i class="bx bx-x icon-close"></i></a>
  <div className='bridge_box gradient-border collapse' id="faq4" data-bs-parent=".faq-list">
  <p>
    {/* Moving this to DEX */}
  {/* ERC20 Contract: <input type="text" id="token_contract" size="50" onFocus="checkContract()" onBlur="checkContract()"></input><br></br><p></p>
  Token Symbol: <span class="tokenSymbol">DDT</span> <br></br> 
  Token Registered: <span class="tokenRegistered">True</span><br></br><p></p>
  <button class="registerButton btn btn-primary" disabled="disabled">Register Token</button><br></br><p></p> */}
  <button className="neon_btn">Mint Fake DTT</button>
  {/* <b></b>Token Balance: <span class="tokenBalance"></span> <br></br><p></p>
  Dero wallet: <input type="text" id="dero_wallet" size="66"></input><br></br><p></p>
  Amount: <input type="text" id="wrap_amount"></input><br></br><p></p>
  <button className="txbutton"class="wrapButton btn btn-primary" disabled="disabled">Bridge TKN<br></br></button> */}

<div className='Bridge_token_container'>

  <h3>Bridge Token</h3>
  <h4>DDT Token selected</h4>
  <h1>0.0</h1>
  {/* <input id='erc_amount'>0.0</input><p></p> */}
  <h5>Enter Amount</h5>

  <div className='bridge_token'>
    <div className='bridge'>
     <img className="bridge_img" src={ethLogo}></img>
     <img className="bridge_img" src={bridge}></img>
     <img className="bridge_img " src={dero}></img>
    </div>
    <div>
    <h6>Eth Address :</h6>
      <h5>{account}</h5>
     <img className="bridge_img " src ={arrow}></img><br></br>
     <h6>Dero Address :</h6>

     <input id='dero_address' size="66"></input>
    </div>
  </div>
 
  <button className='neon_btn'>Bridge Token To Dero</button>


</div>

  </p>
    </div>
  </li>
</ul>
</div>

   </div>

  );}