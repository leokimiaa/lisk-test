# Lisk Smart Contract (Raw Ethers.js)

A minimal, bare-metal example of compiling, deploying, and interacting with a Solidity smart contract on the Lisk Sepolia Testnet using only ethers.js and solc.

This example intentionally avoids frameworks like Hardhat or Truffle to demonstrate the core steps of contract deployment from scratch.

---

## 📁 Project Structure

```
.
├── SimpleStore.sol   # The Solidity smart contract
├── deploy.js         # Script to compile and deploy the contract
├── interact.js       # Script to read/write data to the contract
├── package.json      # Project dependencies
└── .env              # Local file for your private key (Not in Git)
```

---

## ✅ Prerequisites

Before you begin, ensure you have:

- **Node.js** (v18+ recommended) - [Download here](https://nodejs.org/)
- **Metamask Wallet** (or any EVM-compatible wallet)
- **Wallet Private Key** (to sign transactions)
- **Lisk Sepolia ETH** (testnet funds) - Get free testnet ETH from:
  - [Lisk Faucet](https://sepolia-faucet.lisk.com/)
  - [Superchain Faucet](https://console.optimism.io/faucet) (Select Lisk Sepolia)

---

## 🚀 Installation & Setup

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd lisk-project
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the root directory:

```bash
touch .env
```

Add your wallet's private key to the `.env` file:

```env
PRIVATE_KEY=your_metamask_private_key_here
```

> ⚠️ **Security Warning**: Never commit your `.env` file or share your private key with anyone. Add `.env` to your `.gitignore` file.

---

## 📖 Usage

Follow these steps in order to deploy and interact with your smart contract.

### Step 1: Deploy the Contract

Run the deployment script to compile and deploy your contract to the Lisk Sepolia Testnet:

```bash
node deploy.js
```

**Expected Output:**

```
🎉 Contract Deployed Successfully!
📄 Contract Address: 0x123456789...
🔗 View on Explorer: https://sepolia-blockscout.lisk.com/address/0x123...
```

**Important**: Copy the contract address for the next step.

---

### Step 2: Interact with the Contract

#### Update the Script

1. Open `interact.js`
2. Locate the `CONTRACT_ADDRESS` variable at the top
3. Replace the placeholder with your deployed contract address:

```javascript
// !!! REPLACE THIS WITH YOUR DEPLOYED CONTRACT ADDRESS !!!
const CONTRACT_ADDRESS = "0x...PUT_YOUR_ADDRESS_HERE...";
```

#### Run the Interaction Script

```bash
node interact.js
```

**Expected Output:**

```
🚀 Starting interaction script...
🔗 Connected to contract at: 0x...

Current Number in contract: 0

Attempting to change number to: 42...

✅ Transaction confirmed!

New Number in contract: 42

🎉 SUCCESS: The smart contract is working correctly!
```

---

## 🔍 What This Project Does

1. **Compiles** a Solidity smart contract using the `solc` compiler
2. **Deploys** the compiled contract to the Lisk Sepolia Testnet
3. **Interacts** with the deployed contract by:
   - Reading the current stored value
   - Writing a new value (42)
   - Confirming the value was updated

---

## 🛠️ Troubleshooting

### Issue: "Insufficient funds" error

**Solution**: Make sure you have testnet ETH in your wallet. Visit the faucets listed in Prerequisites.

### Issue: "Invalid private key" error

**Solution**: Verify that your private key in `.env` is correct and doesn't include the `0x` prefix (unless your code expects it).

### Issue: Transaction stuck or pending

**Solution**: Lisk Sepolia is a testnet and may experience delays. Check the transaction status on [Lisk Blockscout Explorer](https://sepolia-blockscout.lisk.com/).

---

## 📚 Additional Resources

- [Lisk Documentation](https://docs.lisk.com/)
- [Ethers.js Documentation](https://docs.ethers.org/)
- [Solidity Documentation](https://docs.soliditylang.org/)
- [Lisk Sepolia Explorer](https://sepolia-blockscout.lisk.com/)

---

## ⚠️ Security Notes

- **Never commit** your `.env` file to version control
- **Never share** your private key with anyone
- This is **testnet only** - do not use real funds
- Always verify contract addresses before interacting with them

---

## 📄 License

MIT License - Feel free to use this project for learning and development.

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the issues page.

---

**Happy Coding! 🎉**