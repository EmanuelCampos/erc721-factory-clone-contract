import { ethers } from 'hardhat';

async function main() {
  const MythicalMallardsStaking = await ethers.getContractFactory("MythicalMallardsStaking");
  const mythicalMallardsStaking = await MythicalMallardsStaking.deploy();

  console.log("Mythical Mallards Staking deployed to:", mythicalMallardsStaking.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });