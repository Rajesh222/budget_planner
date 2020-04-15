let router = require('express').Router();
const budgetController = require('../controllers/budget');
router.get('/', function (req, res) {
  res.json({
    status: 'API Its Working',
    message: 'Welcome to budget Planner App!',
  });
});

router
  .route('/allbudget')
  .get(budgetController.index)
  .post(budgetController.create);

router
  .route('/budget')
  .get(budgetController.view)
  .put(budgetController.update)
  .delete(budgetController.delete);

router
  .route('/transaction')
  .put(budgetController.updateTransaction)
  .post(budgetController.addTransaction)
  .delete(budgetController.deleteTransaction);

// Export API routes
module.exports = router;
