// scripts/deploy.js
// Deployment script for PulseGuardHealthRecord on Polygon Amoy testnet using Ethers.js
const hre = require("hardhat");

async function main() {
  console.log("----------------------------------------------------");
  console.log("Deploying PulseGuardHealthRecord to Polygon Amoy...");
  console.log("----------------------------------------------------");

  // Get deployer account details
  const [deployer] = await hre.ethers.getSigners();
  console.log("Deploying contract with account:", deployer.address);
  const balance = await hre.ethers.provider.getBalance(deployer.address);
  console.log("Account balance:", hre.ethers.formatEther(balance), "POL");

  // Get contract factory and deploy
  const PulseGuard = await hre.ethers.getContractFactory("PulseGuardHealthRecord");
  const contract = await PulseGuard.deploy();

  await contract.waitForDeployment();
  const contractAddress = await contract.getAddress();

  console.log("----------------------------------------------------");
  console.log("✅ PulseGuardHealthRecord successfully deployed!");
  console.log("📍 Contract Address:", contractAddress);
  console.log("🌐 Network: Polygon Amoy Testnet (Chain ID: 80002)");
  console.log("----------------------------------------------------");

  console.log("\nNext Steps:");
  console.log(`1. Copy contract address (${contractAddress}) to your frontend environment.`);
  console.log("2. Verify on Polygonscan Amoy: https://amoy.polygonscan.com/address/" + contractAddress);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("❌ Deployment failed:", error);
    process.exit(1);
  });
