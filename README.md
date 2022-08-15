# ETH-Dero-Bridge-v2.0

### Repo usage

clone this repo using git clone
once on your local system you will need to have react and visual studio code installed as this repo is built with react and VS
once you have React installed open a termianl in the repository folder and install all dependencies 
with yarn (in your open terminal type yarn and hit enter)
to run the repo in your open terminal now type "code ." to open the repo in visual studio code,
then simply type "yarn run start" this should open the project on your local net.
### To use the bridge (assuming you have TKN in your meta mask account)
click the connect metamask button, this should prompt metamask to open, make sure your connected to rinkeby testnet and connect your metamask waller 
your current balance will be shown at the top of the home page at the end of the live price feeds
(the last icon on the live crypto price feeds)
scroll down the page and click the drop down menus to see the relavent information such as bridge address, metamask account address and to enter the 
contract address of your tokens ready to be sent to the bridge contract to be deployed to the dero chain (yet to be completed)


## Setting up dero-bridge
Follow these instructions to setup dero-bridge

### Deploy Ethereum smart contracts (EthBridge FakeDTTToken)
- Create .env file and provide the following env variables 
    - PROVIDER_URL: network node url. Config for rinkeby by default
    - WALLET_PRIVATE_KEY: network wallet private key
    - CONTROLLER_WALLET_RPC: dero wallet rpc endpoint. This may change per deployment
    - DERO_SCID: dero smart contract ID. This may change per deployment
    - INFURA_PRIVATE_KEY : Infura key to broadcast transaction

- add netwok configuration to hardhat.config.js. Rinkeby network provided by default

- Run `npx hardhat run scripts/deploy.js --network YOU_NETWORK `. 

- Check abis folder for contract abi and addresses.

NB: 160000 FakeDTT(FDTT) tokens will be minted for owner. This is for testing purposes.

### Deploy Dero Smart contract
- Choose a controlling wallet. 
    This will be used to deploy the smart contract and also as the rpc endpoint for the event listner.

- Install smart contract (SC) token.bas contract
    - RPC endpoint : http://127.0.0.1:30000/install_sc
    - RPC body type: binary file of contract code (token.bas)

- Replace CONTROLLER_WALLET_RPC and DERO_SCID (this is the same as txid for install_sc call) respectively in .env

### Start bridge listener
`yarn start-listener`

### Testing FDTT to Dero Transfer
...

## This project is still underconstruction and is subject to change at any time

### if you contribute to this project or for further details pedr02b211@gmail.com

all donations welcome 0xF41A27673DF4F546993Eb6cF11Dd11F176086610(metamask ethereum)

