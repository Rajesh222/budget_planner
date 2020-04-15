const uuidv4 = require('uuid/v4');

const Budget = require('../models/Budget');

exports.index = function (req, res) {
  Budget.get(function (err, budgets) {
    if (err) {
      res.json({
        status: 'error',
        message: err,
      });
    }
    res.json({
      status: 'success',
      message: 'budget retrieved successfully',
      budgets: budgets,
    });
  });
};

exports.create = function (req, res, next) {
  const budget = new Budget();
  const { name, category, amount } = req.body;
  budget.name = name;
  budget.category = category;
  budget.amount = amount;
  budget.save(function (err) {
    if (err) {
      res.json(err);
    }
    res.json({
      message: 'New budget created!',
      data: budget,
    });
  });
};

exports.view = function (req, res) {
  Budget.findById(req.query.budget_id, function (err, budget) {
    if (err) res.send(err);
    res.json({
      message: 'Single budget retrieved.',
      budget,
    });
  });
};

// Handle budget
exports.update = function (req, res) {
  Budget.findById(req.query.budget_id, function (err, budget) {
    if (err) res.send(err);
    const { name, category, amount } = req.body;
    budget.name = name || budget.name;
    budget.category = category || budget.category;
    budget.amount = amount || budget.amount;
    budget.save(function (err) {
      if (err) res.json(err);
      res.json({
        message: 'budget Info updated',
        budget: budget,
      });
    });
  });
};
// Handle delete Budget
exports.delete = function (req, res) {
  Budget.remove(
    {
      _id: req.query.budget_id,
    },
    function (err, budget) {
      if (err) res.send(err);
      res.json({
        status: 'success',
        message: 'Budget deleted',
      });
    }
  );
};

exports.addTransaction = function (req, res) {
  Budget.findById(req.query.budget_id, function (err, budget) {
    if (err) res.send(err);

    const { transactions } = budget;
    const { description, expense } = req.body;
    const transaction_id = uuidv4();
    transactions.push({ transaction_id, description, expense });
    // save the budget and check for errors
    budget.save(function (err) {
      if (err) res.json(err);
      res.json({
        message: 'Transaction Added',
        budget: budget,
      });
    });
  });
};

exports.updateTransaction = function (req, res) {
  Budget.findById(req.query.budget_id, function (err, budget) {
    if (err) res.send(err);

    const transaction_id = req.query.transaction_id;
    let { transactions } = budget;
    const { description, expense } = req.body;

    const filterTransactions =
      transactions &&
      transactions.filter(function (transaction) {
        return transaction.transaction_id !== transaction_id;
      });
    const transaction = {
      transaction_id,
      description,
      expense,
    };
    filterTransactions.push(transaction);
    budget.transactions = filterTransactions || [];
    budget.save(function (err) {
      if (err) res.json(err);
      res.json({
        message: 'Transaction updated',
        budget: budget,
      });
    });
  });
};

exports.deleteTransaction = function (req, res) {
  Budget.findById(req.query.budget_id, function (err, budget) {
    if (err) res.send(err);

    const transaction_id = req.query.transaction_id;
    const { transactions } = budget;

    const filterTransactions =
      transactions &&
      transactions.filter(function (transaction) {
        return transaction.transaction_id !== transaction_id;
      });
    budget.transactions = filterTransactions || [];
    // save the budget and check for errors
    budget.save(function (err) {
      if (err) res.json(err);
      res.json({
        message: 'Transaction deleted',
        budget: budget,
      });
    });
  });
};
