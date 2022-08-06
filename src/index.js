import ReactDOM from 'react-dom';
import React from 'react';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { HashRouter } from "react-router-dom";
import { Web3ReactProvider } from '@web3-react/core'
import { Web3Provider } from "@ethersproject/providers";


function getLibrary(provider) {
  const library = new Web3Provider(provider);
  library.pollingInterval = 12000;
  return library;
}




ReactDOM.render(
  <HashRouter>
      <Web3ReactProvider getLibrary={getLibrary}>
    <App/>
    </Web3ReactProvider>
  </HashRouter>,
  document.getElementById('root')
);
reportWebVitals();
