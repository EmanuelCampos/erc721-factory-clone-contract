import { ethers } from 'hardhat';

async function main() {
  const MythicalMallardsCalculation = await ethers.getContractFactory("MythicalMallardsCalculation");
  const mythicalMallardsCalculation = await MythicalMallardsCalculation.deploy();

  console.log("Mythical Mallards Calculation deployed to:", mythicalMallardsCalculation.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });