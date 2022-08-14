const axios = require("axios");
const BigNumber = require("bignumber.js");
const ethers = require("ethers");
// require("../fetch-polyfill");

require("dotenv").config({ path: ".env" });

const processedNonce = {};
const processedTxn = {};
const processingError = {};

const Web3 = require("web3");
const { EthBridgeAddress, EthBridgeAbi } = require("../constants");
const db = require("./db/tableland");
const web3Eth = new Web3(process.env.PROVIDER_WS_URL);

const { address: admin } = web3Eth.eth.accounts.wallet.add(
    process.env.WALLET_PRIVATE_KEY
);

const wallet = new ethers.Wallet(process.env.WALLET_PRIVATE_KEY);

const provider = new ethers.providers.AlchemyProvider(
    "maticmum",
    process.env.PROVIDER_KEY
);

// console.log(provider);

const signer = wallet.connect(provider);

// const bridgeEth = new web3Eth.eth.Contract(EthBridgeAbi, EthBridgeAddress);

const bridgeEth = new ethers.Contract(EthBridgeAddress, EthBridgeAbi);

const sendToDERO = async (amount, deroAddress, nonce) => {
    try {
        console.log(`sending to dero: amount: ${amount} | address: ${deroAddress} | nonce: ${nonce}`);
        
        const results = await axios.post(process.env.CONTROLLER_WALLET_RPC, {
            jsonrpc: "2.0",
            id: nonce,
            method: "scinvoke",
            params: {
                scid: process.env.DERO_SCID,
                ringsize: 2,
                sc_rpc: [
                    {
                        name: "entrypoint",
                        datatype: "S",
                        value: "IssueTOKENX",
                    },
                    {
                        name: "amount",
                        datatype: "U",
                        value: amount,
                    },
                    {
                        name: "receipient",
                        datatype: "S",
                        value: deroAddress,
                    },
                ],
            },
        });

        if (results.error) {
            throw new Error(results.error.message);
        }
        console.log('bridging completed')
        return results;
    } catch (error) {
        console.error(error.message);
        return null;
    }
};

/**
 * Assumes a 1:1 ratio
 * @param amountInEth BigNumber
 * @return int
 */ 
const calculateDeroTokenFromEth = (amountInEth) => {
    //using a 1:1 ration

    return parseInt(amountInEth.toString());
};

const sendToEThBridge = async (amount, signer, deroAddress) => {
    const result = await bridgeEth.methods
        .withdraw(amount, deroAddress)
        .send({ from: signer, gas: 700000 });

    console.log(result);
};

const readControllerWalletTransactions = async () => {
    const { data } = await axios.post(process.env.CONTROLLER_WALLET_RPC, {
        jsonrpc: "2.0",
        id: "1",
        method: "GetTransfers",
        params: {
            scid: process.env.DERO_SCID,
            in: true,
        },
    });
    if (data.result.entries) {
        for (let entry of data?.result?.entries) {
            try {
                if (entry.coinbase || !entry.incoming) {
                    continue;
                }

                //check from db if transaction is processed
                const already_processed = processedTxn[entry.txid];
                if (already_processed) {
                    continue;
                }

                if (!entry.sender) {
                    continue;
                }

                await sendToEThBridge(entry.amount, admin, entry.sender);

                //store in database as processed
                processedTxn[entry.txid] = true;
            } catch (error) {
                processingError[entry.txid] = error.message;
                throw error;
            }
        }
    }

    setTimeout(readControllerWalletTransactions, 1000);
};

const readBridgeEvents = async () => {
    bridgeEth.events
        .Deposit({ fromBlock: 0 })
        .on("connected", (event) => {
            console.log("Eth Bridge  connected");
        })
        .on("data", async function (event) {
            // console.log(event);
            const { _sender, amount, nonce, deroAddress } = event.returnValues;

            if (processedNonce[nonce]) {
                return;
            }

            console.log("Ready to mint on the Eth side");
            try {
                const amountOfDero = calculateDeroTokenFromEth(amount);

                //mint on the dero bridge
                const data = await sendToDERO(amountOfDero, deroAddress, nonce);

                if (!data) {
                    return;
                }
                processedNonce[nonce] = true;
            } catch (error) {
                throw error;
            }
        });
};

const handleBridgeEventFactory = (db) => {

    return async ({ sender, amount, deroAddress, nonce, blockNumber }) => {
        const exists = await db.findByNonce(nonce);
        console.log(exists);
        if (exists) {
            return;
        }

        // console.log("Ready to mint on the Eth side");
        try {
            const amountOfDero = calculateDeroTokenFromEth(amount);

            console.log(amountOfDero, deroAddress, nonce);

            //mint on the dero bridge
            const data = await sendToDERO(amountOfDero, deroAddress, nonce);

            if (!data) {
                return;
            }
            //     processedNonce[nonce] = true;
            const results = await db.markLockedToken({
                deroAddress,
                nonce: nonce.toString(),
                ethAddress: sender,
                amount: amount.toString(),
                blockNumber,
            });
            console.log(results);
        } catch (error) {
            console.log(error);
            throw error;
        }
    };
};

async function main() {
    try {
        const tableland = await db({ signer });
        const handleBridgeEvent = handleBridgeEventFactory(tableland);

        // subscribe for upcoming events
        bridgeEth
            .connect(signer)
            .on(
                "Deposit",
                async function (
                    sender,
                    amount,
                    nonce,
                    deroAddress,
                    { blockNumber }
                ) {
                    await handleBridgeEvent({sender, amount, nonce, deroAddress, blockNumber})
                }
            );

        //Read previous events
        const pendingDepositEvents = await bridgeEth
            .connect(signer)
            .queryFilter("Deposit");

        for (let { blockNumber, args } of pendingDepositEvents) {
            const { _sender: sender, amount, deroAddress, nonce } = args;
            await handleBridgeEvent({blockNumber, sender, amount, deroAddress, nonce});
        }

        // readControllerWalletTransactions();
    } catch (error) {
        console.error(error);
    }
}

main();
