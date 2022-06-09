import { expect } from "chai";
import { ethers, network } from "hardhat";
// @ts-ignore
import { 
  ERC721, 
  ERC721__factory, 
  ERC721Factory, 
  ERC721Factory__factory
} from "../types/index";

import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";

describe("ERC20 Staking Base", function () {
  let erc721factory: ERC721Factory;
  let erc721: ERC721__factory;
  let bob: SignerWithAddress;
  let owner: SignerWithAddress;

  beforeEach(async () => {
    // Get the list of accounts
    [owner, bob] = await ethers.getSigners();

    // Deploy Factory Contract
    const ERC721Factory = (await ethers.getContractFactory("ERC721Factory")) as ERC721Factory__factory;
    erc721factory = await ERC721Factory.deploy();
    await erc721factory.deployed();

    erc721 = (await ethers.getContractFactory("ERC721")) as ERC721__factory;
  
  });

  context("contracts", async () => {
    it("Should be able to be the owner of the proxy contract based on the implementation", async function () {
      const tx = await erc721factory.create("Collection 1", "CC1");
      const { events } = await tx.wait()
      
      //@ts-ignore
      const { address } = events?.find(Boolean);

      const instance = erc721.attach(address);

      expect(await instance.owner()).to.equal(owner.address);
    });

    it("Should be able to create one proxy contract based on the implementation", async function () {
      const tx = await erc721factory.create("Collection 1", "CC1");
      const { events } = await tx.wait()
      
      //@ts-ignore
      const { address } = events?.find(Boolean);

      const instance = erc721.attach(address);

      expect(await instance.name()).to.equal("Collection 1");
      expect(await instance.symbol()).to.equal("CC1");
    });

    it("Should be able to create two proxys contract based on the implementation", async function () {
      const tx = await erc721factory.create("Collection 1", "CC1");
      const { events } = await tx.wait()

      //@ts-ignore
      const { address } = events?.find(Boolean);

      const instance = erc721.attach(address);

      expect(await instance.name()).to.equal("Collection 1");
      expect(await instance.symbol()).to.equal("CC1");

      const tx2 = await erc721factory.create("Collection 2", "CC2");
      const { events: events2 } = await tx2.wait()

      //@ts-ignore.
      const { address: address2 } = events2?.find(Boolean);

      const instance2 = erc721.attach(address2);

      expect(await instance2.name()).to.equal("Collection 2");
      expect(await instance2.symbol()).to.equal("CC2");
    });
  });

  context("tokens", async () => {
    it("Should be able to mint one token on proxy contract", async function () {
      const tx = await erc721factory.create("Collection 1", "CC1");
      const { events } = await tx.wait()
      
      //@ts-ignore
      const { address } = events?.find(Boolean);

      const instance = erc721.attach(address);

      await instance.mint(bob.address, 0);

      expect(await instance.balanceOf(bob.address)).to.equal(1);
      expect(await instance.ownerOf(0)).to.be.equal(bob.address);
    });

    it("Should be able to create two proxys contract based on the implementation", async function () {
      const tx = await erc721factory.create("Collection 1", "CC1");
      const { events } = await tx.wait()

      //@ts-ignore
      const { address } = events?.find(Boolean);

      const instance = erc721.attach(address);

      const tx2 = await erc721factory.create("Collection 2", "CC2");

      const { events: events2 } = await tx2.wait()

      //@ts-ignore.
      const { address: address2 } = events2?.find(Boolean);

      const instance2 = erc721.attach(address2);

      await instance.mint(bob.address, 0);

      expect(await instance.balanceOf(bob.address)).to.equal(1);
      expect(await instance.ownerOf(0)).to.be.equal(bob.address);

      await instance2.mint(bob.address, 0);
      await instance2.mint(bob.address, 1);

      expect(await instance2.balanceOf(bob.address)).to.equal(2);
      expect(await instance2.ownerOf(0)).to.be.equal(bob.address);
      expect(await instance2.ownerOf(1)).to.be.equal(bob.address);
    });
  })

});
