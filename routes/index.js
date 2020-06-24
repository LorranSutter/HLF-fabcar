const express = require('express');
const router = express.Router();

const networkConnection = require('../networkConnection');

router.get('/', function (req, res) {
    console.log(_queryCar('CAR1'));
    res.json({ title: 'index' });
});

async function _queryCar(carNumber) {
    try {
        const gateway = await networkConnection.gateway();
        // Get the network (channel) our contract is deployed to.
        const network = await gateway.getNetwork("mychannel");
        // Get the contract from the network.
        const contract = network.getContract("fabcar");
        const result = await contract.evaluateTransaction("queryCar", carNumber);
        console.log(
            `Transaction has been evaluated, result is: ${result.toString()}`
        );
        // Disconnect from the gateway.
        await gateway.disconnect();
        return result;
    } catch (error) {
        console.error(`Failed to evaluate transaction: ${error}`);
        process.exit(1);
    }
}

module.exports = router;