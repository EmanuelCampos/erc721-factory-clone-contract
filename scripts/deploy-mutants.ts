import { ethers } from 'hardhat';

async function main() {
  const MythicalMallardsMutants = await ethers.getContractFactory("MythicalMallardsMutants");
  const mythicalMallardsMutants = await MythicalMallardsMutants.deploy();

  console.log("Mythical Mallards Mutants deployed to:", mythicalMallardsMutants.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });