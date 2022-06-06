import { expect } from "chai";
import { ethers, network } from "hardhat";
// @ts-ignore
import { 
  Staking, 
  Staking__factory, 
  Token, 
  Token__factory, 
  SToken, 
  SToken__factory
} from "../types/index";

import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";

describe("ERC20 Staking Base", function () {
  let erc20staking: Staking;
  let t: Token;
  let st: SToken;
  let bob: SignerWithAddress;
  let owner: SignerWithAddress;

  const HALF_HUNDRED_BLOCKS = 50;

  beforeEach(async () => {
    // Get the list of accounts
    [owner, bob] = await ethers.getSigners();

    // Deploy Token Contract
    const Token = (await ethers.getContractFactory("Token")) as Token__factory;
    t = await Token.deploy();
    await t.deployed();

    // Deploy Staking Token Contract
    const sToken = (await ethers.getContractFactory("sToken")) as SToken__factory;
    st = await sToken.deploy();
    await st.deployed();

    // Deploy Staking Contract
    const ERC20Staking = (await ethers.getContractFactory("Staking")) as Staking__factory;
    erc20staking = await ERC20Staking.deploy(t.address, st.address);
    await erc20staking.deployed();

    await st.transfer(erc20staking.address, ethers.utils.parseUnits('100000', 18));
  });

  async function mineNBlocks(n: number) {
    for (let index = 0; index < n; index++) {
      await ethers.provider.send('evm_mine', []);
    }
  }
  context("tokens", async () => {
    it("Should be able to have supply of rewards token ( rewards )", async function () {
      expect(await st.balanceOf(erc20staking.address)).to.equal(ethers.utils.parseUnits('100000', 18));
    });
  })

  context("staking", async () => {
    it("Should be able to stake token", async function () {
      await t.approve(erc20staking.address, ethers.utils.parseUnits('10', 18));

      await erc20staking.stake(ethers.utils.parseUnits('10', 18));

      const user = await erc20staking.userInfo(owner.address);

      expect(user.amount).to.equal(ethers.utils.parseUnits('10', 18));
    });

    it("Should be able to unstake token", async function () {
      await t.approve(erc20staking.address, ethers.utils.parseUnits('10', 18));

      await erc20staking.stake(ethers.utils.parseUnits('10', 18));

      const user = await erc20staking.userInfo(owner.address);

      expect(user.amount).to.equal(ethers.utils.parseUnits('10', 18));

      await erc20staking.unstake(ethers.utils.parseUnits('5', 18));

      const user2 = await erc20staking.userInfo(owner.address);

      expect(user2.amount).to.equal(ethers.utils.parseUnits('5', 18));
    });

    it("Should be able to claim 200 stokens", async function () {
      await t.approve(erc20staking.address, 2);

      await erc20staking.stake(2);

      await mineNBlocks(HALF_HUNDRED_BLOCKS);

      const pending = await erc20staking.pendingRewards(owner.address);
      const formatedPending = ethers.utils.formatEther(pending);

      await erc20staking.claim();

      expect(formatedPending).to.be.equal('200.0');
    });

    it("Should be able to claim 400 stokens", async function () {
      await t.approve(erc20staking.address, 2);

      await erc20staking.stake(2);

      await mineNBlocks(HALF_HUNDRED_BLOCKS * 2);

      const pending = await erc20staking.pendingRewards(owner.address);
      const formatedPending = ethers.utils.formatEther(pending);

      await erc20staking.claim();

      expect(formatedPending).to.be.equal('400.0');
    });

    it("Should be able to pending stokens", async function () {
      await t.approve(erc20staking.address, 4);

      await erc20staking.stake(2);

      await mineNBlocks(HALF_HUNDRED_BLOCKS);

      await erc20staking.stake(2);

      await mineNBlocks(HALF_HUNDRED_BLOCKS);

      const pending = await erc20staking.pendingRewards(owner.address);
      const formatedPending = ethers.utils.formatEther(pending);

      await erc20staking.claim();

      expect(formatedPending).to.be.equal('400.0');
    });
  })

});
