import '../App.css'
import logo from '../img/e.d.b-LOGO.png'
import { useWeb3React } from '@web3-react/core'
import { InjectedConnector } from '@web3-react/injected-connector'
import { WalletConnectConnector } from '@web3-react/walletconnect-connector'
import { WalletLinkConnector } from '@web3-react/walletlink-connector'
import React, { useEffect, useState } from 'react'
import BridgeForm from './BridgeDetails'
import CryptoFeeds from './CryptoFeeds'

const injected = new InjectedConnector({
  supportedChainIds: [1, 3, 4, 5, 42, 56, 80001, 137],
})
const CoinbaseWallet = new WalletLinkConnector({
  url: `https://mainnet.infura.io/v3/c8fec96713c54f698db3709db29eb64a`,
  appName: 'Eth-Dero Bridge',
  supportedChainIds: [1, 3, 4, 5, 42, 56, 80001, 137],
})
const walletconnect = new WalletConnectConnector({
  rpc: {
    1: 'https://mainnet.infura.io/v3/c8fec96713c54f698db3709db29eb64a',
    4: 'https://rinkeby.infura.io/v3/a0b5fbd9fb474d6aaa171adfd86d7e31',
    80001: 'https://polygon-mumbai.infura.io/v3/c8fec96713c54f698db3709db29eb64a',
    137: 'https://polygon-mainnet.infura.io/v3/c8fec96713c54f698db3709db29eb64a',
    56: 'https://bsc-dataseed.binance.org/',
  },
  network: 'binance',
  qrcode: true,
  pollingInterval: 12000,
})
export default function Hero() {
  const [open, setOpen] = useState(false)

  const {
    active,
    account,
    library,
    connector,
    activate,
    deactivate,
  } = useWeb3React()

  const connectInjected = async () => {
    try {
      await activate(injected)
    } catch (ex) {
      console.log(ex)
    }
  }

  const connectWalletConnect = async () => {
    try {
      await activate(walletconnect)
    } catch (ex) {
      console.log(ex)
    }
  }

  async function disconnect() {
    try {
      deactivate()
      setOpen(!open)
    } catch (ex) {
      console.log(ex)
    }
  }
  // UI Function
  function handleButtonClick() {
    setOpen(!open)
    return open
  }

  var TxtType = function (el, toRotate, period) {
    this.toRotate = toRotate
    this.el = el
    this.loopNum = 0
    this.period = parseInt(period, 10) || 2000
    this.txt = ''
    this.tick()
    this.isDeleting = false
  }

  TxtType.prototype.tick = function () {
    var i = this.loopNum % this.toRotate.length
    var fullTxt = this.toRotate[i]

    if (this.isDeleting) {
      this.txt = fullTxt.substring(0, this.txt.length - 1)
    } else {
      this.txt = fullTxt.substring(0, this.txt.length + 1)
    }

    this.el.innerHTML = '<span class="wrap">' + this.txt + '</span>'

    var that = this
    var delta = 200 - Math.random() * 100

    if (this.isDeleting) {
      delta /= 2
    }

    if (!this.isDeleting && this.txt === fullTxt) {
      delta = this.period
      this.isDeleting = true
    } else if (this.isDeleting && this.txt === '') {
      this.isDeleting = false
      this.loopNum++
      delta = 500
    }

    setTimeout(function () {
      that.tick()
    }, delta)
  }

  window.onload = function () {
    var elements = document.getElementsByClassName('typewrite')
    for (var i = 0; i < elements.length; i++) {
      var toRotate = elements[i].getAttribute('data-type')
      var period = elements[i].getAttribute('data-period')
      if (toRotate) {
        new TxtType(elements[i], JSON.parse(toRotate), period)
      }
    }
    // INJECT CSS
    var css = document.createElement('style')
    css.type = 'text/css'

    css.innerHTML = '.typewrite > .wrap { border-right: 0.08em solid #fff}'
    document.body.appendChild(css)
  }

  return (
    <div>
      <section id="hero">
        <div className="hero_title">
          <img className="hero_logo" src={logo}></img>
          <div className="hero_text">
            <p className="orange_neon">CryptoEscondido</p>
            <h2
              class=" orange_neon typewrite type_font"
              data-period="2000"
              data-type='[ "Eth - Dero Bridge", "Solving Privacy", "Dero:Homomorphic Encrypted blockchain" ]'
            >
              <span class="wrap"></span>
            </h2>
            {/* <div>Active: {active ? "true" : "false"}</div>
      <div>Account: {account ? account : null}</div> */}

            <div className="container">
              {account ? (
                <button className=" neon_btn" onClick={disconnect}>
                  Disconnect
                </button>
              ) : (
                <button
                  onClick={handleButtonClick}
                  type="button"
                  className="neon_btn"
                >
                  Connect Wallet
                </button>
              )}

              {!account && open && (
                <div class="dropdown ">
                  <ul className="wallet_list ">
                    <button
                      className="wallet "
                      onClick={() => {
                        activate(CoinbaseWallet)
                      }}
                    >
                      Coinbase Wallet
                    </button>
                    <button className="wallet" onClick={connectInjected}>
                      Metamask
                    </button>
                    <button className="wallet" onClick={connectWalletConnect}>
                      Wallet Connect
                    </button>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
      <CryptoFeeds />
      <div>
        <p></p>
        <br></br>
        <p></p>

        {account && <BridgeForm account={account} />}
        <p></p>
        <br></br>
        <p></p>
      </div>
    </div>
  )
}
