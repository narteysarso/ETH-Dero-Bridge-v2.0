//SPDX-License-Identifier:MIT
pragma solidity 0.8.9

import "../../EthBridge.sol"

contract EthBridgeEnchindaTest is EthBridge{
    constructor() EthBridge (25) {}

        function enchidna_test_perform_upkeep_gate() public view returns{
            return _nonceCounter ==0;
        }
    
}