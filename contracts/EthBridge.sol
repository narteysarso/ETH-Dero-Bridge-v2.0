//SPDX-License-Identifier: MIT

pragma solidity ^0.8.4;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract EthBridge is Ownable {
    using Counters for Counters.Counter;

    IERC20 token;

    event Deposit(address indexed _sender, uint amount, uint nonce, string deroAddress);
    event WithdrawalProcessed(address indexed _sender, uint amount, string deroAddress);

    //tracks request ID
    Counters.Counter private _withdrawalRequestId;

    //nonce counter 
    Counters.Counter private _nonceCounter;

    //track handled deposites
    mapping(address => mapping(uint => bool)) public processedNonces;
    
    //track all deposite of a person
    mapping (address => uint) private _lockedStacks;

    //track all withdrawal request
    mapping (uint => mapping(address => uint)) private _withdrawalRequests;

    constructor(address _tokenAddress){
        token = IERC20(_tokenAddress);
    }

    //handles deposites
    function deposit(uint amount, string memory deroAddress) external payable {
        require(msg.sender != address(0), "Invalid address");
        require(amount > 0, "Amount not enough");

        _nonceCounter.increment();

        processedNonces[msg.sender][_nonceCounter.current()] = true;

        token.transferFrom(msg.sender, address(this), amount);

        emit Deposit(msg.sender, amount, _nonceCounter.current(), deroAddress);
    }

    function withdraw (uint amount, address receipient, string calldata deroAddress) external onlyOwner {
        require(receipient != address(0), "Invalid issuer address");
        require(amount > 0, "Amount not enough");

        token.transfer(receipient, amount);

        emit WithdrawalProcessed(receipient,  amount, deroAddress);
    }
}
