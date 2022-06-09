import { ethers } from 'hardhat';

async function main() {
  const ERC721Factory = await ethers.getContractFactory("ERC721Factory");
  const erc721factory = await ERC721Factory.deploy();
  await erc721factory.deployed();

  const tx = await erc721factory.create("Collection1", "CC1");
  const { events } = await tx.wait();
  const { address } = events.find(Boolean);

  console.log("Factory Contract address", erc721factory.address)
  console.log("First contract address", address)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });