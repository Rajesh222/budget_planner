import React, { Component } from 'react';
import { Table } from 'react-bootstrap';

export default class BudgetTransaction extends Component {
  render() {
    const { transactions, budget } = this.props;
    const displayTransaction =
      transactions.length > 0 &&
      transactions.map((transaction) => {
        return (
          <tr key={transaction.transaction_id}>
            <td>{transaction.description}</td>
            <td>
              {transaction.expense}
              <a
                className="edit-link"
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  this.props.editTransaction(transaction, budget);
                }}
              >
                Edit
              </a>
              <a
                className="delete-link"
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  this.props.deleteTransaction(transaction, budget._id);
                }}
              >
                Delete
              </a>
            </td>
          </tr>
        );
      });

    return (
      <div>
        <Table striped>
          <thead>
            <tr>
              <th>Description</th>
              <th>Expense</th>
            </tr>
          </thead>
          <tbody>{displayTransaction}</tbody>
        </Table>
      </div>
    );
  }
}
