import '../App.css';

export default function BridgeForm() {
  return (
<div class="container-bridge">
   <div class="section-title">
  <h2>ETH Dero Bridge TX</h2>
</div>
<div className='bridge_tx'>
<ul class="faq-list">
<li>
    <a data-bs-toggle="collapse" class="collapsed" data-bs-target="#faq1">Ethereum Account Address<i class="bx bx-down-arrow-alt icon-show"></i><i class="bx bx-x icon-close"></i></a>
    <div className='bridge_box collapse' id="faq1"  data-bs-parent=".faq-list">
      <p >
        ETH Address: <span class="showAccount">0x71C7656EC7ab88b098defB751B7401B5f6d8976F</span>
      </p>
    </div>
  </li>

  <li>
    <a data-bs-toggle="collapse" data-bs-target="#faq3" class="collapsed">Bridge Contract Address <i class="bx bx-down-arrow-alt icon-show"></i><i class="bx bx-x icon-close"></i></a>
    <div  className='bridge_box collapse'id="faq3"  data-bs-parent=".faq-list">
      <p>
        Bridge Contract Address <span class="showContract">0x71C7656EC7ab88b098defB751B7401B5f6d8976F</span>
      </p>
      <p>
        Bridge Fee <span class="showFee">12</span>
      </p>
    </div>
  </li>
  <li>
  <a data-bs-toggle="collapse" data-bs-target="#faq4" class="collapsed">Token Details<i class="bx bx-down-arrow-alt icon-show"></i><i class="bx bx-x icon-close"></i></a>
  <div className='bridge_box collapse' id="faq4" data-bs-parent=".faq-list">
  <p>
  ERC20 Contract: <input type="text" id="token_contract" size="50" onFocus="checkContract()" onBlur="checkContract()"></input><br></br><p></p>
  Token Symbol: <span class="tokenSymbol">DDT</span> <br></br> 
  Token Registered: <span class="tokenRegistered">True</span><br></br><p></p>
  <button class="registerButton btn btn-primary" disabled="disabled">Register Token</button><br></br><p></p>
  <b></b>Token Balance: <span class="tokenBalance"></span> <br></br><p></p>
  Dero wallet: <input type="text" id="dero_wallet" size="66"></input><br></br><p></p>
  Amount: <input type="text" id="wrap_amount"></input><br></br><p></p>
  <button className="txbutton"class="wrapButton btn btn-primary" disabled="disabled">Bridge TKN<br></br></button>
  </p>
    </div>
  </li>
</ul>
</div>

   </div>

  );}