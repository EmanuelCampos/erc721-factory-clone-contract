import { ethers } from 'hardhat';

async function main() {
  const MythicalMallardsQUAk = await ethers.getContractFactory("MythicalMallardsQuak");
  const mythicalMallardsQUAk = await MythicalMallardsQUAk.deploy();

  console.log("Mythical Mallards QUAk deployed to:", mythicalMallardsQUAk.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });