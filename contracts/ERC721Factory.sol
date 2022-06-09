// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/proxy/Clones.sol";
import "./ERC721.sol";

contract ERC721Factory {
    address public implementation;

    constructor() {
        implementation = address(new ERC721());
    }

    function create(string calldata name_, string calldata symbol_) external returns (address) {
        address clone = Clones.clone(implementation);
        ERC721(clone).initialize(name_, symbol_);
        ERC721(clone).transferOwnership(msg.sender);
        return clone;
    }
}
