import { ethers } from 'hardhat';

async function main() {
  const Token = await ethers.getContractFactory("Token");
  const token = await Token.deploy();
  await token.deployed();

  const sToken = await ethers.getContractFactory("sToken");
  const stoken = await sToken.deploy();
  await stoken.deployed();

  const ERC20Staking = await ethers.getContractFactory("ERC20Staking");
  const erc20staking = await ERC20Staking.deploy(token.address, stoken.address);
  await erc20staking.deployed();

  console.log("ERC20 Staking deployed to:", erc20staking.address);
  console.log("Token deployed to:", token.address);
  console.log("Stoken deployed to:", stoken.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });