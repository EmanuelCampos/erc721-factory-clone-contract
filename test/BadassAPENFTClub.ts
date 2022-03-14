import { expect } from "chai";
import { ethers } from "hardhat";
// @ts-ignore
import { NFTCollection, NFTCollection__factory } from "../typechain/index.ts";

import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";

describe("NFTCollection", function () {
  let nftcollection: NFTCollection;
  let bob: SignerWithAddress;
  let owner: SignerWithAddress;

  beforeEach(async () => {
    // Get the list of accounts
    [owner, bob] = await ethers.getSigners();

    // Deploy Mallards Contract
    const NFTCollectionContract = (await ethers.getContractFactory("BadassApeNFTClub")) as NFTCollection__factory;
    nftcollection = await NFTCollectionContract.deploy("Test Contract", "TEST");
    await nftcollection.deployed();
  });

  it("Should be able to set allow list active", async function () {
    await nftcollection.setAllowListActive(true);
    expect(await nftcollection.isAllowListActive()).to.equal(true);
  });

  it("Should be able to add a user in allow list", async function () {
    await nftcollection.setAllowList([bob.address], 3);
    expect(await nftcollection.numAvailableToMint(bob.address)).to.equal(3);
  });

  it("Should not be able to mint allow list inactive", async function () {
    await expect(nftcollection.connect(bob).mintAllowList(3, ["0xe9707d0e6171f728f7473c24cc0432a9b07eaaf1efed6a137a4a8c12c79552d9"], 0)).to.be.revertedWith("Allow list is not active");
  });

  it("Should not be able to mint more than max allowed in allow list merkle tree", async function () {
    await nftcollection.setAllowList([bob.address], 3);
    await nftcollection.setAllowListActive(true);

    await expect(nftcollection.connect(bob).mintAllowList(4, ["0xe9707d0e6171f728f7473c24cc0432a9b07eaaf1efed6a137a4a8c12c79552d9"], 0)).to.be.revertedWith("Exceeded max available to purchase");
  });

  it("Should not be able to mint allow list with a incorrect value", async function () {
    await nftcollection.setAllowListActive(true);

    await expect(
      nftcollection.connect(bob).mintAllowList(1, [
        "0xe9707d0e6171f728f7473c24cc0432a9b07eaaf1efed6a137a4a8c12c79552d9", 
        "0x7e0eefeb2d8740528b8f598997a219669f0842302d3c573e9bb7262be3387e63"
      ], 0, { value: ethers.utils.parseEther("0.09") })
    ).to.be.revertedWith("Ether value sent is not correct");
  });

  it("Should be able to mint allow list merkle tree", async function () {
    await nftcollection.setAllowList([bob.address], 3);
    await nftcollection.setAllowListActive(true);

    await nftcollection.connect(bob).mintAllowList(1,       [
      "0xe9707d0e6171f728f7473c24cc0432a9b07eaaf1efed6a137a4a8c12c79552d9", 
      "0x7e0eefeb2d8740528b8f598997a219669f0842302d3c573e9bb7262be3387e63"
    ], 0, { value: ethers.utils.parseEther("0.123") });

    expect(await nftcollection.balanceOf(bob.address)).to.equal(1);
    expect(await nftcollection.ownerOf(0)).to.equal(bob.address);
  });

  it("Should not be able to mint more than max allowed in allow list common", async function () {
    await nftcollection.setAllowList([bob.address], 3);
    await nftcollection.setAllowListActive(true);

    await expect(nftcollection.connect(bob).mintAllowList(5, ["0xe9707d0e6171f728f7473c24cc0432a9b07eaaf1efed6a137a4a8c12c79552d9"], 1)).to.be.revertedWith("Exceeded max available to purchase");
  });

  it("Should not be able to mint more than max allowed in allow list common in two transactions", async function () {
    await nftcollection.setAllowList([bob.address], 3);
    await nftcollection.setAllowListActive(true);

    await nftcollection.connect(bob).mintAllowList(2, ["0xe9707d0e6171f728f7473c24cc0432a9b07eaaf1efed6a137a4a8c12c79552d9"], 1, { value: ethers.utils.parseEther("0.20") });
    await expect(nftcollection.connect(bob).mintAllowList(3, ["0xe9707d0e6171f728f7473c24cc0432a9b07eaaf1efed6a137a4a8c12c79552d9"], 1)).to.be.revertedWith("Exceeded max available to purchase");
  });

  it("Should be able to set sales active", async function () {
    await nftcollection.setSaleState(true);
    expect(await nftcollection.saleIsActive()).to.equal(true);
  });

  it("Should not be able to mint less than 1 token", async function () {
    await expect(nftcollection.connect(bob).mint(0)).to.be.revertedWith("You must mint at least one token");
  });

  it("Should not be able to mint before open sales", async function () {
    await expect(nftcollection.connect(bob).mint(1)).to.be.revertedWith("Sale must be active to mint tokens");
  });

  it("Should not be able to mint with a incorrect value", async function () {
    await nftcollection.setSaleState(true);
    await expect(nftcollection.connect(bob).mint(1, { value: ethers.utils.parseEther("0.122") })).to.be.revertedWith(
      "Ether value sent is not correct"
    );
  });

  it("Should not be able to mint without a value", async function () {
    await nftcollection.setSaleState(true);
    await expect(nftcollection.connect(bob).mint(1)).to.be.revertedWith("Ether value sent is not correct");
  });

  it("Should be able to mint after open sales", async function () {
    await nftcollection.setSaleState(true);

    await nftcollection.connect(bob).mint(1, { value: ethers.utils.parseEther("0.15") });

    expect(await nftcollection.balanceOf(bob.address)).to.equal(1);
    expect(await nftcollection.ownerOf(0)).to.equal(bob.address);
  });
});
