// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract sToken is ERC20 {
    constructor() ERC20("sToken", "STKN") {
        _mint(msg.sender, 1_000_000e18);
    }
}
