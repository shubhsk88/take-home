const { Text, Float, Integer } = require("@keystonejs/fields");

const User = {
  fields: {
    name: { type: Text, isRequired: true },
    company: {
      type: Text,
      isRequired: true,
    },
    sales: {
      type: Float,
    },
    quantity: {
      type: Integer,
    },
    amount: {
      type: Float,
    },
  },
};

module.exports = { User };
