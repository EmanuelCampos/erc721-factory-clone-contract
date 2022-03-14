import { ethers } from 'hardhat';

async function main() {
  const MythicalMallardsVials = await ethers.getContractFactory("MythicalMallardsVials");
  const mythicalMallardsVials = await MythicalMallardsVials.deploy("http://localhost:8545");

  console.log("Mythical Mallards Vials deployed to:", mythicalMallardsVials.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });