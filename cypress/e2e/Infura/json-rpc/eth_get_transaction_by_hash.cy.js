describe('Infura API', () => {
  
  const eth_getTransactionByHashSchema = {
    title: 'eth_getTransactionByHash response schema',
    type: 'object',
    required: ['jsonrpc', 'id', 'result'],
    properties: {
      jsonrpc: { type: 'string', const: '2.0' },
      id: { type: 'integer', const: 1 },
      result: {
        type: ['object'],
        required: [
          'hash',
          'nonce',
          'blockHash',
          'blockNumber',
          'transactionIndex',
          'from',
          'to',
          'value',
          'gasPrice',
          'gas',
          'input',
          'v',
          'r',
          's',
          'type',
        ],
        properties: {
          hash: { type: 'string', pattern: '^0x[0-9a-fA-F]{64}$' },
          nonce: { type: 'string', pattern: '^0x[0-9a-fA-F]+$' },
          blockHash: { type: 'string', pattern: '^0x[0-9a-fA-F]{64}$' },
          blockNumber: { type: ['string', 'null'], pattern: '^0x[0-9a-fA-F]*$' },
          transactionIndex: { type: ['string', 'null'], pattern: '^0x[0-9a-fA-F]*$' },
          from: { type: 'string', pattern: '^0x[0-9a-fA-F]{40}$' },
          to: { type: ['string', 'null'], pattern: '^0x[0-9a-fA-F]{40}$' },
          value: { type: 'string', pattern: '^0x[0-9a-fA-F]+$' },
          gasPrice: { type: 'string', pattern: '^0x[0-9a-fA-F]+$' },
          gas: { type: 'string', pattern: '^0x[0-9a-fA-F]+$' },
          input: { type: 'string', pattern: '^0x[0-9a-fA-F]*$' },
          v: { type: 'string', pattern: '^0x[0-9a-fA-F]+$' },
          r: { type: 'string', pattern: '^0x[0-9a-fA-F]{64}$' },
          s: { type: 'string', pattern: '^0x[0-9a-fA-F]{64}$' },
          type: { type: 'string', pattern: '^0x[0-9a-fA-F]+$' },
          accessList: {
            type: ['array', 'undefined'],
            items: {
              type: 'object',
              required: ['address', 'storageKeys'],
              properties: {
                address: { type: 'string', pattern: '^0x[0-9a-fA-F]{40}$' },
                storageKeys: {
                  type: 'array',
                  items: { type: 'string', pattern: '^0x[0-9a-fA-F]{64}$' },
                },
              },
            },
          },
          chainID: { type: ['string', 'undefined'], pattern: '^0x[0-9a-fA-F]*$' },
          maxPriorityFeePerGas: { type: ['string', 'undefined'], pattern: '^0x[0-9a-fA-F]+$' },
          maxFeePerGas: { type: ['string', 'undefined'], pattern: '^0x[0-9a-fA-F]+$' },
        },
      },
    },
  };
              

  it('eth_getTransactionByHash', () => {
    cy.fixture("eth_get_transaction_by_hash").then((transactionData)=>{
      console.log(transactionData.transactionHash)

      cy.makeInfuraCall('eth_getTransactionByHash', [transactionData.transactionHash]).then((response)=>{
        expect(response.status).to.equal(200);
        expect(response.body).to.be.jsonSchema(eth_getTransactionByHashSchema);
      })
    })
    
  });


});