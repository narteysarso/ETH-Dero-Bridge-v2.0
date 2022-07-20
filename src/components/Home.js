import '../App.css';
import React from "react";
import Header from './Header';

import { Link } from "react-router-dom";
import Footer from './Footer';
import Hero from './Hero';
import Crypto from './CryptoFeeds';
import Bridge from './BridgeDetails'

export default function Home() {
  return (
    <div>
     <Header/>
     <Hero/>
     <Crypto/>
     <Bridge/>
     <Footer/>
    </div>
  );}