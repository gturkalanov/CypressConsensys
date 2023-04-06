const EthereumTx = require('ethereumjs-tx').Transaction;
import Web3 from 'web3';

describe('Ethereum JSON-RPC End-to-End Scenario', () => {

    it('should send Ether from one account to another', () => {

        // Get initial balance
        cy.makeInfuraCall("eth_getBalance",[Cypress.env('testWallet'), 'latest']).then((response)=>{
            const initialBalance = (parseInt(response.body.result,16)/1000000000000000000).toFixed(5)
            // Get the number of transactions sent from the account
            cy.makeInfuraCall('eth_getTransactionCount',[Cypress.env('testWallet'), 'latest']).then((transactionCountResponse) => {
                const nonce = transactionCountResponse.body.result;

                cy.makeInfuraCall('eth_gasPrice',[]).then((gasPriceResponse) => {
                    const gasPrice = gasPriceResponse.body.result;

                    // Initialize the web3 provider
                    const web3 = new Web3(new Web3.providers.HttpProvider(Cypress.env('infuraGoerliUrl') + Cypress.env('infuraProjectId')));

                    // Replace with your test account private key (remove the '0x' prefix)
                    const privateKey = Buffer.from('8dda3eb44da345ee69fb9f0974fb0e44319015a7bcc8a3e4ec91cf03269ad142', 'hex');

                    const transactionValue =  web3.utils.toHex(web3.utils.toWei('0.001', 'ether'))
                    // Set the transaction details
                    const rawTx = {
                        nonce: web3.utils.toHex(nonce),
                        gasPrice: gasPrice,
                        gasLimit: web3.utils.toHex(21000),
                        to: Cypress.env('toAccount'),
                        value: transactionValue,
                    };

                    // Sign the transaction
                    const tx = new EthereumTx(rawTx, { chain: 'goerli' }); // Replace 'your_chain' with the appropriate chain, e.g., 'mainnet', 'ropsten', 'rinkeby', etc.
                    tx.sign(privateKey);

                    // Serialize and send the transaction
                    const serializedTx = tx.serialize();
                    const raw = '0x' + serializedTx.toString('hex');

                    // Send Ether from the first account to another account
                    cy.makeInfuraCall('eth_sendRawTransaction',[raw]).then((transactionResponse) => {
                        const transactionHash = transactionResponse.body.result;
                        // Get the transaction and check the value and sendTo address
                        cy.makeInfuraCall('eth_getTransactionByHash', [transactionHash]).then((response)=>{
                            expect(response.status).to.equal(200);
                            expect(response.body.result.value).to.equal(transactionValue)
                            expect(response.body.result.to).to.equal(Cypress.env('toAccount'))
                        })
                    })

                    
                })
                
            });
        })
        

    });
});