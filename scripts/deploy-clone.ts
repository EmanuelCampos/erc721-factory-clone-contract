import { ethers } from 'hardhat';

async function main() {
  const MythicalMallardsClones = await ethers.getContractFactory("MythicalMallardsClones");
  const mythicalMallardsClones = await MythicalMallardsClones.deploy();

  console.log("Mythical Mallards Clones deployed to:", mythicalMallardsClones.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });