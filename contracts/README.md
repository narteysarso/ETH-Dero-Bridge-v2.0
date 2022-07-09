## Setting up dero smart contract
Follow the instruction in [documentation](https://docs.dero.io/rtd_pages/basic_deploysc.html?highlight=smart%20contract) OR You can also use the dero simulator (simulator-windows-amd64) for this test.

NB: if you are using the simulator you don't need to setup a wallet. The simulator environment provides 21 wallets for testing.

The simulator was used to carry out this experiment.

I used wallet rpc endpoints http://127.0.0.1:30000 (wallet1) and http://127.0.0.1:30001 (wallet2)

## Dero Smart Contract
Get the dero smart contract from token.bas in the smart contract directory

## Install smart contract (SC) via json rpc
I use the wallet1 to install token.bas contract. This makes wallet1 the controller wallet for the smart contract.

- RPC endpoint : http://127.0.0.1:30000/install_sc
- RPC body type: binary file of contract code

NB: the return txid is same as scid

## Check wallet1 balance on SC
(Undocumented) You can check the balance of a wallet for a token by using the `GetBalance` method and passing params with smart contract ID (scid).

- RPC endpoint: http://127.0.0.1:30000/json_rpc
- RPC body type: json

 `{
        "jsonrpc": "2.0",
        "id": "1",
        "method": "GetBalance",
        "params" : {
                "scid": "YOUR SMART CONTRACT ID"
            }
 }`

## IssueToken by calling SC function
We calling the IssueTOKENX function on the SC to issue tokens to an address on the smart contract

`{
        "jsonrpc": "2.0",
        "id": "1",
        "method": "scinvoke",
        "params": {
                "scid": "YOUR SMART CONTRACT ID",
                "ringsize": 2,
                "sc_rpc": [{
                        "name": "entrypoint",
                        "datatype": "S",
                        "value": "IssueTOKENX"
                }, {
                    "name": "amount",
                    "datatype": "U",
                    "value": INTENDED_AMOUNT
                }, {
                    "name": "receipient",
                    "datatype": "S",
                    "value": "YOU DERO WALLET ADDRESS"
                }]
        }
}`