//SPDX-License-Identifier: MIT

pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";


contract FakeUSDC is ERC20, Ownable {

    constructor() ERC20("USDC","USDC"){
        //mint 160000 tokens to owner
        _mint(msg.sender, 160000 * 10 ** 18);
    }


    function mint(address _to, uint _amount) public onlyOwner {
        require(_to != address(0), "Invalid address");
        require(_amount > 0, "Amount should be more than zero");

        _mint(_to, _amount);
    }

    function decimals() public view virtual override returns (uint8){
        return 6;
    }
}