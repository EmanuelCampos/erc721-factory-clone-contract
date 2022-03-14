import { ethers } from 'hardhat';

async function main() {
  const MythicalMallardsGenesis = await ethers.getContractFactory("MythicalMallardsGenesis");
  const mythicalMallardsGenesis = await MythicalMallardsGenesis.deploy();

  console.log("Mythical Mallards Genesis deployed to:", mythicalMallardsGenesis.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });