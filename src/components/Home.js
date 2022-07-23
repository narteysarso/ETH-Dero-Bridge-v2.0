import '../App.css';
import React from "react";
import Header from './Header';

import Footer from './Footer';
import Hero from './Hero';
import Crypto from './CryptoFeeds';
import Bridge from './BridgeDetails'

export default function Home() {
  return (
    <div>
     <Header/>
     <Hero/>
     {/* <Crypto/> */}
     <Footer/>
    </div>
  );}