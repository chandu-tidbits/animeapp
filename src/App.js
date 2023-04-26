import "./App.css";
import React, { useEffect, useState } from "react";

const TWITTER_LINK = "https://twitter.com/chanlan07";
const TWITTER_HANDLE = "chanlan07";

const TEST_GIFS = [
  "https://media1.giphy.com/media/dyjrpqaUVqCELGuQVr/giphy.gif?cid=ecf05e4736691mrsksowpnfho1c34p64euy5l5w7kr6u487x&ep=v1_gifs_search&rid=giphy.gif&ct=g",
  "https://media4.giphy.com/media/VXJWhaO7afRe/giphy.gif?cid=ecf05e47an12h9b01p3bjwwukekvtmrqq0c7ut7q739o4jxc&ep=v1_gifs_search&rid=giphy.gif&ct=g",
  "https://media0.giphy.com/media/PSf1mz68Z9mO4/giphy.gif?cid=ecf05e47u083wja4jozuwvl86dkzq88zvcsj79ea85qkv9ps&ep=v1_gifs_search&rid=giphy.gif&ct=g",
];

function App() {
  const [walletAddress, setWalletAddress] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [gifList, setGifList] = useState([]);

  const checkIfWalletIsConnected = async () => {
    if (window.solana.isPhantom) {
      console.log("Wallet found!");

      const res = await window.solana.connect({ onlyIfTrusted: true });
      console.log("Connected with public key: ", res.publicKey.toString());

      setWalletAddress(res.publicKey.toString());
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

  useEffect(() => {
    if (walletAddress) {
      console.log("Fetching GIF List...");
      setGifList(TEST_GIFS);
    }
  }, [walletAddress]);

  const sendGif = async () => {
    if (inputValue.length > 0) {
      console.log("gif link:", inputValue);
      setGifList([...gifList, inputValue]);
      setInputValue("");
    } else {
      console.log("Empty input. Try again.");
    }
  };

  const renderConnectedContainer = () => (
    <div className="connected-container">
      <form
        onSubmit={(event) => {
          event.preventDefault();
          sendGif();
        }}
      >
        <input
          type="text"
          placeholder="Enter GIF Link!"
          value={inputValue}
          onChange={onInputChange}
        />
        <button type="submit" className="cta-button submit-gif-button">
          Submit
        </button>
      </form>
      <div className="gif-grid">
        {gifList.map((gif) => (
          <div className="gif-item" key={gif}>
            <img src={gif} alt={gif} />
          </div>
        ))}
      </div>
    </div>
  );

  const connectWallet = async () => {
    const { solana } = window;

    if (solana) {
      const res = await solana.connect();
      console.log("Connected with public key: ", res.publicKey.toString());
      setWalletAddress(res.publicKey.toString());
    }
  };

  const onInputChange = (event) => {
    const { value } = event.target;
    setInputValue(value);
  };

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
      <div className={walletAddress ? "authed-container" : "container"}>
        <div className="header-container">
          <p className="header">🖼 GIF Portal</p>
          <p className="sub-text">
            View your GIF collection in the metaverse ✨
          </p>
          {!walletAddress && renderNotConnectedContainer()}
          {walletAddress && renderConnectedContainer()}
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
