// src/App.js
import React, { useState } from 'react';
import { BrowserProvider, Contract } from 'ethers';
import { contractAddress, contractABI } from './contract';
import './App.css';

function App() {
  const [account, setAccount] = useState(null);
  const [metadataURL, setMetadataURL] = useState('');
  const [status, setStatus] = useState('');

  const connectWallet = async () => {
    try {
      if (!window.ethereum) throw new Error('MetaMask not detected');

      const provider = new BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const userAddress = await signer.getAddress();

      const network = await provider.getNetwork();
      if (network.chainId !== 43113n) {
        throw new Error('Please connect to Avalanche Fuji (chainId 43113)');
      }

      setAccount(userAddress);
      setStatus('Wallet connected ✅');
    } catch (err) {
      console.error(err);
      setStatus(`Connection error: ${err.message}`);
    }
  };

  const mintNFT = async () => {
    if (!metadataURL) {
      setStatus('Please enter a metadata URL');
      return;
    }

    try {
      const provider = new BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();

      const contract = new Contract(contractAddress, contractABI, signer);

      setStatus('Minting in progress... ⛏️');
      const tx = await contract.safeMint(account, metadataURL);
      await tx.wait();

      setStatus(`✅ NFT minted! Tx hash: ${tx.hash}`);
      setMetadataURL('');
    } catch (err) {
      console.error(err);
      setStatus(`Minting failed: ${err.message}`);
    }
  };

  return (
    <div className="App">
      <h1>Mint Your NFT 🖼️</h1>

      {!account ? (
        <button onClick={connectWallet}>Connect Wallet</button>
      ) : (
        <p>Connected as: {account}</p>
      )}

      <input
        type="text"
        placeholder="Enter metadata URL (e.g. https://.../metadata.json)"
        value={metadataURL}
        onChange={(e) => setMetadataURL(e.target.value)}
        style={{ width: '400px', padding: '10px', marginTop: '10px' }}
      />

      <br />
      <button onClick={mintNFT} style={{ marginTop: '10px' }}>Mint NFT</button>

      <p>{status}</p>
    </div>
  );
}

export default App;
