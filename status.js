const { ethers } = require("ethers");
require("dotenv").config();

async function checkStatus() {
  console.log("📡 Menghubungkan ke Lisk Sepolia Testnet...");

  const provider = new ethers.JsonRpcProvider("https://rpc.sepolia-api.lisk.com");

  if (!process.env.PRIVATE_KEY) {
    console.error("❌ Error: PRIVATE_KEY tidak ditemukan di file .env");
    process.exit(1);
  }

  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
  const address = wallet.address;

  console.log("🔍 Mengambil status untuk dompet...");
  console.log(`📇 Alamat: ${address}`);

  try {
    const [balanceBigInt, txCount, network] = await Promise.all([
      provider.getBalance(address),
      provider.getTransactionCount(address),
      provider.getNetwork()
    ]);

    const balance = ethers.formatEther(balanceBigInt);

    console.log("\n--- 📊 Status Dompet ---");
    console.log(`🌐 Jaringan:         ${network.name}`);
    console.log(`🆔 Chain ID:         ${network.chainId}`);
    console.log(`📈 Jumlah Transaksi: ${txCount} (Nonce)`);
    console.log(`💰 Saldo:            **${balance} ETH**`);
    console.log("------------------------\n");

  } catch (error) {
    console.error("\n❌ Gagal mengambil status dompet:", error.message);
    process.exit(1);
  }
}

checkStatus();