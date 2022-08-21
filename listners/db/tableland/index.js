const { connect, resultsToObjects } = require("@tableland/sdk");

const db = async ({ signer }) => {
    const tableNamePrefix = `dero_eth_bridge_test`;

    const tbl = await connect({ signer, network: "testnet", chain: "polygon-mumbai" });

    const { name: tablename } = await getTable(tbl, tableNamePrefix);

    if (!tablename) {
        throw Error("Table does not exists");
    }

    return Object.freeze({
        markLockedToken: async ({
            blockNumber,
            nonce,
            amount,
            deroAddress,
            ethAddress
        }) => {
            const writeRes = await tbl.write(
                `INSERT INTO ${tablename} VALUES ('${blockNumber}','${ethAddress}','${deroAddress}','${amount}','${nonce}');`
            );

            return writeRes;
        },
        findByNonce: async (nonce) => {
            const readRes = await tbl.read(
                `SELECT * FROM ${tablename} WHERE nonce = '${nonce}'`
            );
            const result = resultsToObjects(readRes);
            return result[0];
        },
    });
};

const getTable = async (connection, tablename) => {
    const tables = await connection.list();

    const tableExists = Object.values(tables).filter(({ name }) =>
        name.includes(tablename)
    );

    // Create a table if not exists
    if (!tableExists.length) {
        // using text because int(24) and bigint(64) are not sufficient for uint256
        console.log('creating table')
        const resp =  await connection.create(
            `blockNumber text, ethAddress text, deroAddress text, amount text, nonce text, unique (nonce)`,
            {
                prefix: tablename
            }
        );

        console.log('Table Created');

        return resp;
    }

    return tableExists[0];
};

module.exports = db;
