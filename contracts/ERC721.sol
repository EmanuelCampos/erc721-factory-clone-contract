// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC721/ERC721Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";

contract ERC721 is Initializable, ERC721Upgradeable, OwnableUpgradeable {
    using StringsUpgradeable for uint256;

    /// @notice the implementation of ERC721
    uint256 public implementation;

    /// @notice the new baseURI
    string private baseURIExtendend;

    /// @notice initialize the contract with the given name and symbol
    /// @param name_ the name of the collection
    /// @param symbol_ the symbol of the collection
    function initialize(string memory name_, string memory symbol_) public initializer {
        __ERC721_init(name_, symbol_);
        __Ownable_init();
    }


    /// @notice Update the baseURI of the contract
    /// @param to_ address that the nft will be minted
    /// @param tokenId_ the id of the nft
    function mint(address to_, uint256 tokenId_) public onlyOwner {
        _safeMint(to_, tokenId_);
    }

    /// @notice Update the baseURI of the contract
    /// @param baseURI_ the new baseURI
    function setBaseURI(string memory baseURI_) public onlyOwner {
        baseURIExtendend = baseURI_;
    }


    /// @notice Get the tokenURI of a token
    /// @param tokenId the tokenId
    function tokenURI(uint256 tokenId) public view virtual override returns (string memory) {
        require(_exists(tokenId), "ERC721Metadata: URI query for nonexistent token");

        string memory baseURI = baseURIExtendend;
        return bytes(baseURI).length > 0 ? string(abi.encodePacked(baseURI, tokenId.toString())) : "";
    }
}
