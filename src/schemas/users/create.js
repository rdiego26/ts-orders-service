module.exports = {
  type: 'object',
  required: ['fullName', 'password', 'confirmation', 'email'],
  properties: {
    fullName: {
      type: 'string',
    },
    password: {
      type: 'string',
    },
    confirmation: {
      type: 'string',
    },
    email: {
      type: 'string',
      pattern: '^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$',
    },
  },
};
