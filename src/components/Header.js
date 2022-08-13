import '../App.css'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export default function Header() {
  return (
    <nav className="border" class="navbar navbar-expand-lg bg-light mt-0">
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

          <button className="enableEthereumButton d-flex btn btn-dark d-grid gap-2 d-md-block">
            Connect MetaMask
          </button>
          
        </div>
      </div>
    </nav>
  )
}
