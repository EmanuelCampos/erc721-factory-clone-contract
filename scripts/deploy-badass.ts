import { ethers } from 'hardhat';

async function main() {
  const BadassContract = await ethers.getContractFactory("BadassApeNFTClub");
  const badassContract = await BadassContract.deploy("Badass Ape NFT Club", "BANC", "https://gateway.pinata.cloud/ipfs/QmbLQZQRXJyc6ZoEoSF2RdMpwRYak3CLywS7JxS9ncDg9T/");

  console.log("Badass deployed to:", badassContract.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });