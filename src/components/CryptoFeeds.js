
 

import React, { useEffect, useState } from "react";
import '../App.css';
import btc_logo from "../img/bitcoin-btc-logo.png"
import litecon_logo from "../img/litecoin-ltc-logo.png"
import eth_logo from "../img/kisspng-ethereum-portable-network-graphics-computer-icons-developers-icon-request-icon-ethereum-5cb941c220f890.5510979515556448661351.png"
import cardano_logo from "../img/cardano-ada-logo.png"
import solana_logo from "../img/solana-sol-logo.png"
import tether_logo from "../img/tether-usdt-logo.png"


 

export default function CryptoFeeds() {
  
  // const [cryptos, setCryptos] = useState([]);

  const [btc, setBtc] = useState([]);
  const [eth, setEth] = useState([]);
  const [lite, setLite] = useState([]);
  const [tether, setTether] = useState([]);
  const [solana, setSolana] = useState([]);
  const [cardano, setCardano] = useState([]);


 
  const loadData = async () => {
    const res = await fetch(
      "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin%2Cethereum%2Ctether%2Clitecoin%2Ccardano%2Csolana&vs_currencies=usd"
    );
    const data = await res.json();
  // let crypto =[]
  //   for (const key in data) {
  //     crypto.push([key, Object.values(data[key])[0]]);
     
  //   }
  //   setCryptos(crypto)
  //   console.log(cryptos)
    for (const key in data) {
      console.log(`${key}: ${data[key]}`);
      if(key == "bitcoin"){
        let btc = Object.values(data[key])[0];
        setBtc(btc)


      }else  if(key == "litecoin"){
        let lite = Object.values(data[key])[0];
        setLite(lite)


      }else  if(key == "tether"){
        let tether = Object.values(data[key])[0];
        setTether(tether)


      }else  if(key == "cardano"){
        let cardano = Object.values(data[key])[0];
        setCardano(cardano)


      }else  if(key == "solana"){
        let solana = Object.values(data[key])[0];
        setSolana(solana)


      }else  if(key == "ethereum"){
        let ethereum = Object.values(data[key])[0];
        setEth(ethereum)    
      }
    }

  };

  useEffect(() => {
    loadData();
  }, []);




  return (
    <div class="container-live  ">
    <div class=" coin-price ">
      <img className="crypto_logo" src={btc_logo}></img>
      <h5 class="logo" id="bitcoin">$ {btc}</h5>
                 <h5>Btc</h5>
    </div>
    <div class="coin-price ">
      <img className="crypto_logo" src={litecon_logo}></img>
      < h5 class="logo ">$<span id="litecoin">{lite}</span></ h5>
                 < h5>Litecon</ h5>
    </div> 
    <div class="coin-price ">
      <img className="crypto_logo" src={eth_logo}></img>
      < h5 class="logo ">$<span id="ethereum">{eth}</span></ h5>
                 < h5>Eth</ h5>
    </div> <div class="   coin-price ">
      <img className="crypto_logo" src={tether_logo}></img>
      < h5 class="    logo ">$<span id="tether">{tether}</span></ h5>
                 < h5>Tether</ h5>
    </div> <div class="   coin-price ">
      <img className="crypto_logo" src={cardano_logo}></img>
      < h5 class="    logo ">$<span id="cardano">{cardano}</span></ h5>
                 < h5>Cardano</ h5>
    </div> <div class="   coin-price ">
      <img className="crypto_logo" src={solana_logo}></img>
      < h5 class="    logo ">$<span id="solana">{solana}</span></ h5>
                 < h5>Solana</ h5>
    </div>
   
         
         </div>
  );}