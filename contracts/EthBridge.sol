//SPDX-License-Identifier: MIT

pragma solidity ^0.8.9;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "hardhat/console.sol";

contract EthBridge is Ownable {
    using Counters for Counters.Counter;

    event Deposit(address indexed _sender, uint amount, uint nonce, string deroAddress);
    event WithdrawalProcessed(address indexed _sender, uint amount, string deroAddress);

    //tracks request ID
    Counters.Counter private _withdrawalRequestId;

    //nonce counter 
    Counters.Counter private _nonceCounter;

    uint public feeRate = 1000;

    //track handled deposites
    mapping(address => mapping(uint => bool)) public processedNonces;
    
    //maps Eth address to Dero address
    mapping (address => string) private addressMapping;

    // map dero address to eth
    mapping (string => address) private ethAddressOf;

    //track all withdrawal request
    mapping (uint => mapping(address => uint)) private _withdrawalRequests;

    //handles deposites
    function lockTokens(address _tokenAddress, uint _amount, string memory deroAddress) external payable {
        ERC20 token = ERC20(_tokenAddress);

        require(msg.sender != address(0), "Invalid address");

        require(_amount > 0, "Amount not enough");

        require(token.allowance(msg.sender, address(this)) >= _amount, "Approve tokens first");

        _nonceCounter.increment();

        processedNonces[msg.sender][_nonceCounter.current()] = true;

        addressMapping[msg.sender] =  deroAddress;

        ethAddressOf[deroAddress] = msg.sender;

        token.transferFrom(msg.sender, address(this), _amount);

        uint nomalizedAmount = normalizeAmount(token.decimals(), _amount);

        emit Deposit(msg.sender, nomalizedAmount, _nonceCounter.current(), deroAddress);
    }

    function normalizeAmount(uint8 _tokenDecimals, uint _amount) internal pure returns (uint) {
        if(_tokenDecimals > 8){
            return _amount / 10 ** (_tokenDecimals - 8);
        }

        return _amount;
    }

    function denomalizeAmount(uint8 _tokenDecimals, uint _amount) internal pure returns (uint){
        if(_tokenDecimals > 8){
            return _amount * 10 ** (_tokenDecimals + 8);
        }

        return _amount;
    }

    function releaseTokens(address _tokenAddress, uint _amount, string memory deroAddress) external onlyOwner {
        ERC20 token = ERC20(_tokenAddress);

        uint amount = denomalizeAmount(token.decimals(), _amount);

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

    function setFee(uint _feeRate) external onlyOwner{
        feeRate = _feeRate;
    }
}
