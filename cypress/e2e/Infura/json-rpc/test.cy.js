const EthereumTx = require('ethereumjs-tx').Transaction;
import Web3 from 'web3';

describe('Ethereum JSON-RPC End-to-End Scenario', () => {

    it('should send Ether from one account to another', () => {
        const hash = "0x2a1a75f9d2b093546cde5dff9bd4dd4b943070f40c5307345a54066000d3b740"
        cy.makeInfuraCall('eth_getTransactionByHash', [hash]).then((response)=>{
            expect(response.status).to.equal(200);
            const value =  (parseInt(response.body.result.value,16)/1000000000000000000)
            console.log(value)
        })
    })
})