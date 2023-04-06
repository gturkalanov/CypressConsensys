describe('Infura API', () => {

  const eth_getBalanceSchema = {
    title: 'eth_getBalance response schema',
    type: 'object',
    required: ['jsonrpc', 'id', 'result'],
    properties: {
      jsonrpc: { type: 'string', const: '2.0' },
      id: { type: 'integer', const: 1 },
      result: { type: 'string', pattern: '^0x[0-9a-fA-F]+$' },
    },
  };

  it('eth_getBalance', () => {
    cy.makeInfuraCall("eth_getBalance",[Cypress.env('testWallet'), 'latest']).then((response)=>{
      expect(response.status).to.equal(200);
      expect(response.body).to.be.jsonSchema(eth_getBalanceSchema);
    })
  });

});