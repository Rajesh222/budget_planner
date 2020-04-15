import React, { Component } from 'react';
import { Form, Button } from 'react-bootstrap';
import Select from 'react-select';

const options = [
  { value: 'Food', label: 'Food & Drinks' },
  { value: 'Shopping', label: 'Shopping' },
  { value: 'Housing', label: 'Housing' },
  { value: 'Transportation', label: 'Transportation' },
  { value: 'Vehicle', label: 'Vehicle' },
  { value: 'Life', label: 'Life & Entertainment' },
  { value: 'Communications', label: 'Communications' },
  { value: 'Financial', label: 'Financial Expenses' },
  { value: 'Investment', label: 'Investment' },
  { value: 'Others', label: 'Others' },
];

export default class BudgetForm extends Component {
  constructor(props) {
    super(props);
    const selectedOption = options.find((option) => {
      return option.value === this.props.budget.category;
    });
    this.state = {
      selectedOption: selectedOption || null,
      budgetName: this.props.budget.name || '',
      amount: this.props.budget.amount || '',
      budget_id: this.props.budget._id || '',
    };
  }

  handleCategory = (selectedOption) => {
    this.setState({ selectedOption }, () =>
      console.log(`Option selected:`, this.state.selectedOption)
    );
  };

  handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({ [name]: value });
  };
  handleSubmit = (e) => {
    e.preventDefault();
    const { selectedOption, budgetName, amount, budget_id } = this.state;
    if (!selectedOption || !budgetName || !amount) {
      return;
    } else {
      this.props.handleFormSubmit({
        budget_id,
        budgetName,
        selectedOption,
        amount,
      });
    }
  };
  render() {
    const { selectedOption, amount, budgetName } = this.state;
    return (
      <Form className="budget-form" onSubmit={this.handleSubmit}>
        <Form.Group>
          <Form.Label>Budget Name: </Form.Label>
          <Form.Control
            type="text"
            name="budgetName"
            placeholder="Enter Budget Name"
            onChange={this.handleChange}
            value={budgetName}
            required
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Category: </Form.Label>
          <Select
            value={selectedOption}
            onChange={this.handleCategory}
            options={options}
            placeholder="Please Select Category"
            required
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Amount: </Form.Label>
          <Form.Control
            type="number"
            name="amount"
            placeholder="Enter Amount"
            onChange={this.handleChange}
            value={amount}
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Create Budget
        </Button>
      </Form>
    );
  }
}
