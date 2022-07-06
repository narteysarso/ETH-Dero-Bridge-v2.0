   /* eslint-env jquery */

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';

var btc = document.getElementById("bitcoin");
var ltc = document.getElementById("litecoin");
var eth = document.getElementById("ethereum");
var usdt = document.getElementById("tether");
var ada = document.getElementById("cardano");
var sol = document.getElementById("solana");

var liveprice = {
    "async": true,
    "scroosDomain": true,
    "url": "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin%2Cethereum%2Ctether%2Clitecoin%2Ccardano%2Csolana&vs_currencies=usd",

    "method": "GET",
    "headers": {}
}

reportWebVitals();
$.ajax(liveprice).done(function (response){
  btc.innerHTML = response.bitcoin.usd;
  ltc.innerHTML = response.litecoin.usd;
  eth.innerHTML = response.ethereum.usd;
  usdt.innerHTML = response.tether.usd;
  ada.innerHTML = response.cardano.usd;
  sol.innerHTML = response.solana.usd;
  console.log(response)

})



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
