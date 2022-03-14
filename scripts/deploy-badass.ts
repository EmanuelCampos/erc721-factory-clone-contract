import { ethers } from 'hardhat';

async function main() {
  const BadassContract = await ethers.getContractFactory("BadassApeNFTClub");
  const badassContract = await BadassContract.deploy();

  console.log("Badass deployed to:", badassContract.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });