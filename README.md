Lisk Smart Contract (Raw Ethers.js)
This project is a minimal, "bare-metal" example of how to compile, deploy, and interact with a Solidity smart contract on the Lisk Sepolia Testnet using only ethers.js and solc.
This example avoids frameworks like Hardhat or Truffle to show the core steps of a contract deployment.
Project Structure
.
├── SimpleStore.sol   # The Solidity smart contract
├── deploy.js         # Script to compile and deploy the contract
├── interact.js       # Script to read/write data to the contract
├── package.json      # Project dependencies
└── .env              # Local file for your private key (Not in Git)


1. Prerequisites
Before you begin, you will need:
Node.js (v18+ recommended) installed.
Metamask Wallet (or any EVM wallet).
A Wallet Private Key (to sign transactions).
Lisk Sepolia ETH (Testnet funds). You can get this from:
Lisk Faucet: https://sepolia-faucet.lisk.com/
Superchain Faucet: https://console.optimism.io/faucet (Select Lisk Sepolia)
2. Installation & Setup
Clone the repository (or download the files):
git clone <your-repo-url>
cd lisk-project


Install dependencies:
npm install


Create your environment file:
Create a file named .env in the root of the project.
Add your Private Key:
Open the .env file and add your wallet's private key. This key is a secret, never share it!
PRIVATE_KEY=your_metamask_private_key_here


3. Usage
Follow these steps in order.
Step 1: Deploy the Contract
Run the deploy.js script to compile the contract and deploy it to the Lisk Sepolia Testnet.
node deploy.js


Output:
If successful, it will print the new contract address.
...
🎉 Contract Deployed Successfully!
📄 Contract Address: 0x123456789...
🔗 View on Explorer: [https://sepolia-blockscout.lisk.com/address/0x123](https://sepolia-blockscout.lisk.com/address/0x123)...


Copy the Contract Address for the next step.
Step 2: Interact with the Contract
Update the Script: Open the interact.js file.
Paste the Address: Find the CONTRACT_ADDRESS variable at the top and paste your newly deployed address.
// !!! REPLACE THIS WITH YOUR DEPLOYED CONTRACT ADDRESS !!!
const CONTRACT_ADDRESS = "0x...PUT_YOUR_ADDRESS_HERE..."; 


Run the script:
This will read the default value (0), write a new value (42), and read it back to confirm.
node interact.js


Output:
🚀 Starting interaction script...
🔗 Connected to contract at: 0x...
...
Current Number in contract: 0
...
Attempting to change number to: 42...
...
✅ Transaction confirmed!
...
New Number in contract: 42

🎉 SUCCESS: The smart contract is working correctly!


