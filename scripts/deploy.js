const hre = require("hardhat");

async function main() {

  const [deployer] = await hre.ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);

  const Charity = await hre.ethers.getContractFactory("Charity");
  const charity = await Charity.deploy();

  await charity.deployed();

  console.log("Charity deployed to:", charity.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });