//SPDX-License-Identifier: MIT

pragma solidity ^0.8.9;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "hardhat/console.sol";

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
    
    //maps Eth address to Dero address
    mapping (address => string) private addressMapping;

    // map dero address to eth
    mapping (string => address) private ethAddressOf;

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

        addressMapping[msg.sender] =  deroAddress;

        ethAddressOf[deroAddress] = msg.sender;

        token.transferFrom(msg.sender, address(this), amount);

        emit Deposit(msg.sender, amount, _nonceCounter.current(), deroAddress);
    }

    function withdraw (uint amount, string memory deroAddress) external onlyOwner {

        token.transfer(ethAddressOf[deroAddress], amount);

        emit WithdrawalProcessed(ethAddressOf[deroAddress],  amount, deroAddress);
    }

    function changeAddressMap(string memory deroAddress) external {
        addressMapping[msg.sender] = deroAddress;
        ethAddressOf[deroAddress]= msg.sender;
    }

    function getDeroAddressOf(address _address) external view onlyOwner returns (string memory){
        return addressMapping[_address];
    }

    function getEthAddressOf(string memory deroAddress) external view returns (address){
        return ethAddressOf[deroAddress];
    }
}
