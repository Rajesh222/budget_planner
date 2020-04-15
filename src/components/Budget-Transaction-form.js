import React, { Component } from 'react';
import { Form, Button } from 'react-bootstrap';

export default class BudgetTransactionForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      description: this.props.transaction.description || '',
      expense: this.props.transaction.expense || '',
      transaction_id: this.props.transaction.transaction_id || '',
      transactionBudget: this.props.transactionBudget || {},
    };
  }

  handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({ [name]: value });
  };
  handleSubmit = (e) => {
    e.preventDefault();
    const {
      description,
      expense,
      transaction_id,
      transactionBudget,
    } = this.state;
    if (!description || !expense) {
      return;
    } else {
      this.props.handleTransactionFormSubmit({
        transaction_id,
        description,
        expense,
        budget_id: transactionBudget._id,
      });
    }
  };
  render() {
    const { description, expense } = this.state;
    return (
      <Form className="budget-transaction-form" onSubmit={this.handleSubmit}>
        <Form.Group>
          <Form.Label>Transaction Description: </Form.Label>
          <Form.Control
            type="text"
            name="description"
            placeholder="Enter Transaction Description"
            onChange={this.handleChange}
            value={description}
            required
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Expense Amount: </Form.Label>
          <Form.Control
            type="number"
            name="expense"
            placeholder="Enter Expense Amount"
            onChange={this.handleChange}
            value={expense}
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          ADD
        </Button>
      </Form>
    );
  }
}
