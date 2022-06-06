// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "hardhat/console.sol";

contract Staking is Ownable {
    using SafeERC20 for IERC20;
    using SafeMath for uint256;
   
    struct UserInfo {
        uint256 amount;
        uint256 rewardDebt;
        uint256 lastReward;
    }

    IERC20 public _token;
    IERC20 public _stoken;

    uint256 immutable TOKENS_PER_BLOCK = 2e18;

    mapping(address => UserInfo) public userInfo;

    event Stake(address indexed staker, uint256 amount);
    event Claimed(address indexed staker, uint256 amount);
    event Unstake(address indexed staker, uint256 amount);

    constructor(
        address token_,
        address stoken_
    ) {
        _token = IERC20(token_);
        _stoken = IERC20(stoken_);
    }

    receive() external payable {}

    function stokenPerBlock(uint256 lastBlockNumber) public view returns(uint256) {
        uint256 blocks = block.number.sub(lastBlockNumber);
        return blocks.mul(TOKENS_PER_BLOCK);
    }

    function stake(uint256 amount) public {
        UserInfo storage user = userInfo[msg.sender];

        _token.safeTransferFrom(msg.sender, address(this), amount);

        if(user.amount != 0) {
            uint256 pending = user.amount.mul(stokenPerBlock(user.lastReward));

            user.rewardDebt.add(pending);
            user.lastReward = block.number;
        }

        user.amount = user.amount.add(amount);
        user.lastReward = block.number;
        
        emit Stake(msg.sender, amount);
    }

    function unstake(uint256 amount) public {
        UserInfo storage user = userInfo[msg.sender];

        _token.safeTransfer(msg.sender, amount);
        
        user.amount = user.amount.sub(amount);

        emit Unstake(msg.sender, amount);
    }

    function claim() public {
        UserInfo storage user = userInfo[msg.sender];

        uint256 pending = user.amount.mul(stokenPerBlock(user.lastReward));

        _stoken.safeTransfer(msg.sender, pending);

        user.lastReward = block.number;
        user.rewardDebt = 0;

        emit Claimed(msg.sender, pending);
    }

    function pendingRewards(address address_) public view returns(uint256) {
        UserInfo storage user = userInfo[address_];
        
        uint256 pending = user.amount.mul(stokenPerBlock(user.lastReward));

        return pending;
    }
    
  
    function emergencyWithdraw() public onlyOwner {
        uint balance = address(this).balance;
        payable(msg.sender).transfer(balance);
    }
}