import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Accordion,
  Card,
  Button,
  useAccordionToggle,
  Row,
  Col,
} from 'react-bootstrap';

import BudgetTransaction from './Budget-transaction';

export default class BudgetList extends Component {
  static propTypes = {
    budgets: PropTypes.array,
  };
  showBudgetList = (budgets) => {
    const list =
      budgets &&
      budgets.length > 0 &&
      budgets.map((budget, index) => {
        const { transactions } = budget;

        let totalExpense = transactions.reduce(
          (accumulator, currentValue) =>
            accumulator + Number(currentValue.expense),
          0
        );
        const remaining = budget.amount - totalExpense;
        function CustomToggle({ children, eventKey }) {
          const decoratedOnClick = useAccordionToggle(eventKey, () =>
            console.log('totally custom!', eventKey)
          );

          return (
            <button
              type="button"
              style={{ backgroundColor: 'lightGreen' }}
              onClick={decoratedOnClick}
            >
              {children}
            </button>
          );
        }
        return (
          <Card key={budget._id}>
            <Card.Header>
              <Row>
                <Col md={1}>
                  <CustomToggle eventKey={`${index}`}>+</CustomToggle>
                </Col>
                <Col md={10}>
                  <span className="budget-name">{`${budget.name} (${budget.category})`}</span>
                </Col>
                <Col md={1}>
                  <Button onClick={() => this.props.handleForm(budget)}>
                    Edit
                  </Button>
                </Col>
              </Row>
              <Row>
                <Col
                  md={{ span: 6, offset: 4 }}
                >{`Total: ${budget.amount}  |  Remaining : ${remaining}`}</Col>
              </Row>
            </Card.Header>
            <Accordion.Collapse eventKey={`${index}`}>
              <Card.Body>
                <Button
                  variant="secondary"
                  className="add-transaction"
                  onClick={() => {
                    this.props.addTransaction(budget._id);
                  }}
                >
                  Add Transaction
                </Button>
                {transactions && transactions.length > 0 && (
                  <BudgetTransaction
                    transactions={transactions}
                    editTransaction={this.props.editTransaction}
                    deleteTransaction={this.props.deleteTransaction}
                    budget={budget}
                  />
                )}
              </Card.Body>
            </Accordion.Collapse>
          </Card>
        );
      });

    return <Accordion defaultActiveKey="0">{list}</Accordion>;
  };
  render() {
    const { budgets } = this.props;
    return <div className="budget-list">{this.showBudgetList(budgets)}</div>;
  }
}
