const fs = require("fs");
const solc = require("solc");
const { ethers } = require("ethers");
require("dotenv").config();

async function main() {
  console.log("🚀 Starting deployment process...");

  // --- 1. COMPILATION STEP ---
  console.log("📦 Compiling SimpleStore.sol...");
  
  const sourceCode = fs.readFileSync("SimpleStore.sol", "utf8");

  const input = {
    language: "Solidity",
    sources: {
      "SimpleStore.sol": { content: sourceCode },
    },
    settings: {
      outputSelection: {
        "*": { "*": ["*"] },
      },
    },
  };

  const output = JSON.parse(solc.compile(JSON.stringify(input)));

  // Check for compilation errors
  if (output.errors) {
    const errors = output.errors.filter((err) => err.severity === "error");
    if (errors.length > 0) {
      console.error("❌ Compilation Errors:", errors);
      process.exit(1);
    }
  }

  // Extract ABI and Bytecode
  const contractFile = output.contracts["SimpleStore.sol"]["SimpleStore"];
  const abi = contractFile.abi;
  const bytecode = contractFile.evm.bytecode.object;

  console.log("✅ Compilation successful!");

  // --- 2. DEPLOYMENT STEP ---
  console.log("📡 Connecting to Lisk Sepolia Testnet...");

  // Lisk Sepolia RPC URL
  const provider = new ethers.JsonRpcProvider("https://rpc.sepolia-api.lisk.com");

  // Setup Wallet
  if (!process.env.PRIVATE_KEY) {
    console.error("❌ Error: PRIVATE_KEY not found in .env file");
    process.exit(1);
  }
  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

  console.log(`👛 Deploying from address: ${wallet.address}`);

  // Create Contract Factory
  const factory = new ethers.ContractFactory(abi, bytecode, wallet);

  // Send Deployment Transaction
  // Note: We do not need to manually set gasPrice usually, but Lisk is L2 so it's handled automatically
  const contract = await factory.deploy();

  console.log("⏳ Waiting for transaction confirmation...");
  
  // Wait for block confirmation
  await contract.waitForDeployment();

  const contractAddress = await contract.getAddress();
  
  console.log("----------------------------------------------------");
  console.log(`🎉 Contract Deployed Successfully!`);
  console.log(`📄 Contract Address: ${contractAddress}`);
  console.log(`🔗 View on Explorer: https://sepolia-blockscout.lisk.com/address/${contractAddress}`);
  console.log("----------------------------------------------------");
}

main().catch((error) => {
  console.error("\n❌ Deployment Failed:");
  console.error(error);
  process.exit(1);
});