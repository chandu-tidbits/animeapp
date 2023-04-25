import "./App.css";
import React, { useEffect } from "react";

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

  return <div className="App"></div>;
}

export default App;
