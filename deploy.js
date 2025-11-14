const fs = require("fs");
const solc = require("solc");
const { ethers } = require("ethers");
require("dotenv").config();

async function main() {
  console.log("🚀 Memulai proses deployment...\n");

  // --- 1. LANGKAH KOMPILASI ---
  console.log("📦 Mengkompilasi SimpleStore.sol...");
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
  
  if (output.errors) {
    const errors = output.errors.filter((err) => err.severity === "error");
    if (errors.length > 0) {
      console.error("❌ Error Kompilasi:", errors);
      process.exit(1);
    }
  }

  const contractFile = output.contracts["SimpleStore.sol"]["SimpleStore"];
  const abi = contractFile.abi;
  const bytecode = contractFile.evm.bytecode.object;
  
  console.log("✅ Kompilasi sukses!\n");

  // Simpan ABI untuk frontend
  fs.writeFileSync(
    "SimpleStore.json",
    JSON.stringify(abi, null, 2)
  );
  console.log("💾 ABI disimpan ke SimpleStore.json\n");

  // --- 2. LANGKAH DEPLOYMENT ---
  console.log("📡 Menghubungkan ke Lisk Sepolia Testnet...");
  const provider = new ethers.JsonRpcProvider("https://rpc.sepolia-api.lisk.com");
  
  if (!process.env.PRIVATE_KEY) {
    console.error("❌ Error: PRIVATE_KEY tidak ditemukan di .env file");
    process.exit(1);
  }

  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
  console.log(`👛 Deploy dari alamat: ${wallet.address}`);

  // Cek balance dulu
  const balance = await provider.getBalance(wallet.address);
  console.log(`💰 Balance: ${ethers.formatEther(balance)} ETH\n`);

  if (balance === 0n) {
    console.error("❌ Error: Balance 0! Silakan claim faucet dulu.");
    console.log("🔗 Faucet: https://sepolia-faucet.lisk.com/");
    process.exit(1);
  }

  // Ambil fee data
  console.log("⛽ Mengambil data gas jaringan...");
  const feeData = await provider.getFeeData();
  
  if (!feeData.gasPrice) {
    console.error("❌ Error: Tidak bisa mengambil data gas dari RPC.");
    process.exit(1);
  }

  console.log(`📊 Harga gas standar: ${ethers.formatUnits(feeData.gasPrice, "gwei")} gwei`);

  // Naikkan gas price 50% untuk lebih cepat (lebih aman dari 125%)
  const aggressiveGasPrice = (feeData.gasPrice * 150n) / 100n;
  console.log(`🔥 Menggunakan gas price: ${ethers.formatUnits(aggressiveGasPrice, "gwei")} gwei\n`);

  // Buat Contract Factory
  const factory = new ethers.ContractFactory(abi, bytecode, wallet);

  console.log("📤 Mengirim transaksi deployment...");
  
  // Deploy dengan gas price yang lebih tinggi
  const contract = await factory.deploy({
    gasPrice: aggressiveGasPrice,
    gasLimit: 500000n // Set gas limit eksplisit
  });

  const txHash = contract.deploymentTransaction().hash;
  console.log(`✅ Transaksi terkirim!`);
  console.log(`📝 TX Hash: ${txHash}`);
  console.log(`🔗 Lihat TX: https://sepolia-blockscout.lisk.com/tx/${txHash}\n`);

  console.log("⏳ Menunggu konfirmasi (ini bisa 15-60 detik)...");
  
  await contract.waitForDeployment();

  const contractAddress = await contract.getAddress();

  console.log("\n====================================================");
  console.log("🎉 DEPLOYMENT BERHASIL!");
  console.log("====================================================");
  console.log(`📄 Alamat Kontrak: ${contractAddress}`);
  console.log(`🔗 Lihat Kontrak: https://sepolia-blockscout.lisk.com/address/${contractAddress}`);
  console.log("====================================================\n");

  // Test read kontrak
  console.log("🧪 Testing kontrak...");
  const number = await contract.getNumber();
  console.log(`✅ getNumber() returns: ${number.toString()}`);

  console.log("\n📋 LANGKAH SELANJUTNYA:");
  console.log("1. Copy alamat kontrak di atas");
  console.log("2. Paste ke file App.jsx di variabel contractAddress");
  console.log("3. Copy file SimpleStore.json ke folder src/ React project");
  console.log("4. Run frontend: npm run dev");
}

main().catch((error) => {
  console.error("\n❌ DEPLOYMENT GAGAL:");
  console.error(error.message);
  
  if (error.message.includes("insufficient funds")) {
    console.log("\n💡 Solusi: Claim faucet di https://sepolia-faucet.lisk.com/");
  }
  
  if (error.message.includes("nonce")) {
    console.log("\n💡 Solusi: Tunggu transaksi sebelumnya selesai atau reset MetaMask");
  }
  
  process.exit(1);
});