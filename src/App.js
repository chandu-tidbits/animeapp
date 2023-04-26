import "./App.css";
import React, { useEffect, useState } from "react";

const TWITTER_LINK = "https://twitter.com/chanlan07";
const TWITTER_HANDLE = "chanlan07";

function App() {
  const checkIfWalletIsConnected = async () => {
    if (window.solana.isPhantom) {
      console.log("Wallet found!");

      const res = await window.solana.connect({ onlyIfTrusted: true });
      console.log("Connected with public key: ", res.publicKey.toString());
    } else {
      console.log("Install phantom");
      alert("install phantom at phantom.app");
    }
  };

  useEffect(() => {
    const onLoad = async () => {
      await checkIfWalletIsConnected();
    };
    window.addEventListener("load", onLoad);
    return () => window.removeEventListener("load", onLoad);
  }, []);

  const connectWallet = async () => {};

  const renderNotConnectedContainer = () => (
    <button
      className="cta-button connect-wallet-button"
      onClick={connectWallet}
    >
      Connect To Wallet
    </button>
  );

  return (
    <div className="App">
      <div className="container">
        <div className="header-container">
          <p className="header">🖼 GIF Portal</p>
          <p className="sub-text">
            View your GIF collection in the metaverse ✨
          </p>
          {renderNotConnectedContainer()}
        </div>
        <div className="footer-container">
          <img
            alt="Twitter Logo"
            className="twitter-logo"
            src="https://raw.githubusercontent.com/buildspace/gif-portal-starter/dea9ce3dfdd7c67ab45a5048611533d6fc733073/src/assets/twitter-logo.svg"
          />
          <a
            className="footer-text"
            href={TWITTER_LINK}
            target="_blank"
            rel="noreferrer"
          >{`built on @${TWITTER_HANDLE}`}</a>
        </div>
      </div>
    </div>
  );
}

export default App;
