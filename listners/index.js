const axios = require("axios");
const BigNumber = require("bignumber.js");
const { io } = require("socket.io-client");

require("dotenv").config({ path: ".env" });

//--- Ethereum Bridge below ----

const processedNonce = {};

const Web3 = require("web3");
const { EthBridgeAddress, EthBridgeAbi } = require("../constants");
const web3Eth = new Web3(process.env.PROVIDER__WS_URL);
const { address: admin } = web3Eth.eth.accounts.wallet.add(process.env.WALLET_PRIVATE_KEY);

const bridgeEth = new web3Eth.eth.Contract(
	EthBridgeAbi,
    EthBridgeAddress
);

bridgeEth.events
    .Deposit({ fromBlock: 0})
	.on("connected", (event) => {
		console.log("Eth Bridge  connected");
	  })
    .on("data", async function(event){
		// console.log(event);
        const { _sender, amount, nonce, deroAddress } = event.returnValues;

		if(processedNonce[nonce]){
			return;
		}

        console.log("Ready to mint on the Eth side");
        try {
			const amountOfDero = calculateDeroTokenFromEth(amount);

             //mint on the dero bridge
			const data = await sendToDERO(amountOfDero, deroAddress, nonce);

			if(!data){
				return;
			}
			processedNonce[nonce] = true;

        } catch (error) {
			console.error(error)
		}
    });

const sendToDERO = async (amount, deroAddress, nonce) => {
	try {
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

		if(results.error){
			throw new Error(results.error.message);
		}

		return results;
	} catch (error) {
		console.error(error);
		return null;
	}
};

const calculateDeroTokenFromEth = (amountInEth) => {
    //using a 1:1 ration
    const amount = new BigNumber(amountInEth);
    const amountOfDero = amount.div(10 ** 18);

    return parseInt(amountOfDero.toString());
};

const sendToEth = async (amount, ethAddress) => {
    // bridgeEth.methods.
};
