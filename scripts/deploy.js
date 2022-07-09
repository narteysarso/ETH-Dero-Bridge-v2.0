// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

async function main() {

  const fdtt =  await hre.ethers.getContractFactory("FakeDTTToken");
  const deployedfdtt = await fdtt.deploy();
  await deployedfdtt.deployed();
  
  const EthBridge = await hre.ethers.getContractFactory("EthBridge");
  const deployedEthBridge = await EthBridge.deploy(deployedfdtt.address);

  await deployedEthBridge.deployed();

  storeContractData(deployedEthBridge, "EthBridge");
  storeContractData(deployedfdtt, "FakeDTTToken");

  console.log("FakeDTTToken deployed to:", deployedfdtt.address);
  console.log("EthBridge deployed to:", deployedEthBridge.address);
}


const storeContractData = (contract, contractName) => {
  const fs = require("fs");
  const contractDir = `${__dirname}/../abis`;

  if (!fs.existsSync(contractDir)) {
    fs.mkdirSync(contractDir);
  }

  const contractArtiacts = artifacts.readArtifactSync(contractName);

  fs.writeFileSync(
    contractDir + `/${contractName}.json`,
    JSON.stringify({ address: contract.address, ...contractArtiacts }, null, 2)
  );
};

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
.catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
