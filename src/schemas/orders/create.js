module.exports = {
  type: 'object',
  required: ['merchantReference', 'amount'],
  properties: {
    merchantReference: {
      type: 'string',
    },
    amount: {
      type: 'number',
      minimum: 1,
    },
  },
};
