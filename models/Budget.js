const mongoose = require('mongoose');
// Setup schema
const budgetSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  currency: {
    type: String,
  },
  transactions: {
    type: Array,
  },
});

const Budget = (module.exports = mongoose.model('budgets', budgetSchema));
module.exports.get = function (callback, limit) {
  Budget.find(callback).limit(limit);
};
