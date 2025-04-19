import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers'; // Import directly from ethers
import { contractAddress, contractABI } from './contract'; // Import contract address and ABI
import './App.css';

const App = () => {
  const [account, setAccount] = useState(null);
  const [contract, setContract] = useState(null);
  const [nfts, setNfts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [minting, setMinting] = useState(false);
  const [tokenURI, setTokenURI] = useState('');

  // Initialize contract when MetaMask is connected
  useEffect(() => {
    if (window.ethereum) {
      const provider = new ethers.Web3Provider(window.ethereum); // Using Web3Provider from ethers

      // Request account access if needed
      window.ethereum.request({ method: 'eth_requestAccounts' })
        .then(accounts => {
          setAccount(accounts[0]);  // Set the first account to state
        })
        .catch(err => {
          console.error('Error accessing MetaMask accounts', err);
          alert('Please connect your MetaMask wallet!');
        });

      // Initialize the contract with the signer
      const signer = provider.getSigner();
      const contractInstance = new ethers.Contract(contractAddress, contractABI, signer);
      setContract(contractInstance);
    } else {
      alert('Please install MetaMask!');
    }
  }, []);

  // Fetch all NFTs from the contract
  const fetchNFTs = async () => {
    if (contract) {
      setIsLoading(true);
      const totalSupply = await contract.totalSupply();
      const nftArray = [];
      for (let i = 0; i < totalSupply; i++) {
        try {
          const owner = await contract.ownerOf(i);
          nftArray.push({ tokenId: i, owner });
        } catch (err) {
          console.error(err);
        }
      }
      setNfts(nftArray);
      setIsLoading(false);
    }
  };

  // Handle minting NFT
  const mintNFT = async () => {
    if (contract && tokenURI) {
      setMinting(true);
      try {
        const transaction = await contract.mint(account, tokenURI);
        await transaction.wait();
        alert('NFT minted successfully!');
        fetchNFTs(); // Refresh the list of NFTs after minting
      } catch (err) {
        console.error(err);
        alert('Minting failed. Please try again.');
      } finally {
        setMinting(false);
      }
    } else {
      alert('Please provide a valid token URI!');
    }
  };

  return (
    <div className="App">
      <h1>Mint Your NFT</h1>
      {account ? (
        <>
          <p>Connected account: {account}</p>
          <button onClick={fetchNFTs} disabled={isLoading}>Fetch NFTs</button>
          <div>
            <input
              type="text"
              placeholder="Enter token URI"
              value={tokenURI}
              onChange={(e) => setTokenURI(e.target.value)}
            />
            <button onClick={mintNFT} disabled={minting}>Mint NFT</button>
          </div>
          <div>
            {isLoading ? (
              <p>Loading NFTs...</p>
            ) : (
              <ul>
                {nfts.map((nft) => (
                  <li key={nft.tokenId}>Token ID: {nft.tokenId}, Owner: {nft.owner}</li>
                ))}
              </ul>
            )}
          </div>
        </>
      ) : (
        <p>Please connect your MetaMask wallet!</p>
      )}
    </div>
  );
};

export default App;
