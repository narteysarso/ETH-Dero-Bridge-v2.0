import '../App.css'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import dero from '../img/dero.png'
import polygonLogo from '../img/polygon.png';
import ethLogo from '../img/eth.png';

export default function Header({account,network}) {
  console.log(network)
  console.log("network")


  return (
    <nav className="border" class="navbar navbar-expand-lg bg-light mt-0">
      <a target="_blank" href="https://dero.io/">
        <img className="wallet_image" src={dero}></img>
      </a>

      <div className="container-fluid ">
        <Link to="/">Home</Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link to="/about">About</Link>
            </li>
            <li className="nav-item">
              <Link to="/contact">Contact</Link>
            </li>
          </ul>
          { account ?<button className="enableEthereumButton d-flex btn btn-dark d-grid gap-2 d-md-block"><img className='network_logo' alt="Network logo"  src={ ethLogo} />{account.slice(0, 6)}...{account.slice(-4)}
          </button> : <button className="enableEthereumButton d-flex btn btn-dark d-grid gap-2 d-md-block">Not Connected
          </button>}

        
        </div>
      </div>
    </nav>
  )
}
