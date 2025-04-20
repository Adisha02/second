# 🖼️ NFT Minting DApp

A full-stack decentralized application (DApp) built with React and Ethers.js v6 that allows users to mint NFTs by entering a metadata URL. This project interacts with a deployed ERC-721 smart contract on the Avalanche Fuji testnet.

---

## ✨ Features

- 🔗 Connect MetaMask Wallet
- 🖼️ Mint NFTs via metadata URL (e.g., hosted on IPFS)
- ⛓️ Built for Avalanche Fuji testnet (Chain ID: 43113)
- ⚡ Powered by Ethers.js v6.13.5
- 🌍 Deployed frontend via Vercel

---

## 🧠 Prerequisites

Before getting started, ensure you have the following installed:

- Node.js (v18 or later)
- MetaMask browser extension
- Avalanche Fuji testnet configured in MetaMask
- GitHub account for cloning
- Vercel account for deployment (optional)

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/Adisha02/mint-dapp.git
cd mint-dapp


INSTALL DEPENDENCIES
npm install
Add Smart Contract Info
Create a file called src/contract.js and paste the following content:

js
Copy
Edit
Replace these values with your deployed contract details
export const contractAddress = "YOUR_CONTRACT_ADDRESS_HERE";
export const contractABI = [
  // Paste your contract ABI here
];
mint-dapp/
├── public/
│   └── index.html
├── src/
│   ├── App.js         // Main React component
│   ├── contract.js    // Contract address & ABI
│   └── App.css        // Basic styling
├── package.json
└── README.md
Metadata Format Example (metadata.json)
Make sure your metadata URL points to a file like this:

json
Copy
Edit
{
  "name": "My Cool NFT",
  "description": "An awesome NFT for Web3",
  "image": "https://ipfs.io/ipfs/<your-image-hash>"
}
