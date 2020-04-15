import React, { Component, Fragment } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import ReactLoading from 'react-loading';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Axios from 'axios';
import BudgetForm from './Budget-form';
import BudgetList from './Budget-list';
import BudgetTransactionForm from './Budget-Transaction-form';
import { BASE_URL } from '../config';
import './budget.scss';

export default class Budget extends Component {
  constructor(props) {
    super(props);
    this.state = {
      budgets: [],
      isformOpen: false,
      budget: {},
      isTransactionformOpen: false,
      transaction: {},
      budget_id: '',
      transactionBudget: {},
      loader: false,
    };
  }

  fetchBudget = async () => {
    try {
      this.setState({
        loader: true,
      });
      const resp = await Axios.get(`${BASE_URL}/allbudget`);

      resp &&
        resp.data &&
        this.setState({ budgets: resp.data.budgets, loader: false });
    } catch (error) {
      this.setState({
        loader: false,
      });
    }
  };
  componentDidMount() {
    this.fetchBudget();
  }
  handleFormSubmit = async ({
    budget_id,
    budgetName,
    selectedOption,
    amount,
  }) => {
    try {
      if (budget_id) {
        const res = await Axios.put(
          `${BASE_URL}/budget?budget_id=${budget_id}`,
          {
            name: budgetName,
            category: selectedOption.value,
            amount,
          }
        );
        if (res) {
          this.fetchBudget();
          this.setState({ isformOpen: false });
          toast.success('Budget Updated successfully', {
            position: toast.POSITION.TOP_CENTER,
          });
        }
      } else {
        const res = await Axios.post(`${BASE_URL}/allbudget`, {
          name: budgetName,
          category: selectedOption.value,
          amount,
        });
        if (res) {
          this.fetchBudget();
          this.setState({ isformOpen: false });
          toast.success('Budget Created successfully', {
            position: toast.POSITION.TOP_CENTER,
          });
        }
      }
    } catch (error) {
      this.setState({ isformOpen: false });
      toast.error('Somethng went wrong!', {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };

  handleTransactionFormSubmit = async ({
    budget_id,
    transaction_id,
    description,
    expense,
  }) => {
    try {
      this.setState({
        loader: true,
      });
      if (transaction_id) {
        const res = await Axios.put(
          `${BASE_URL}/transaction?budget_id=${budget_id}&transaction_id=${transaction_id}`,
          {
            description,
            expense,
          }
        );
        if (res) {
          this.fetchBudget();

          this.setState({ isTransactionformOpen: false, loader: false });
          toast.success('Transaction Updated successfully', {
            position: toast.POSITION.TOP_CENTER,
          });
        }
      } else {
        const res = await Axios.post(
          `${BASE_URL}/transaction?budget_id=${this.state.budget_id}`,
          {
            description,
            expense,
          }
        );
        if (res) {
          this.fetchBudget();
          this.setState({ isTransactionformOpen: false, loader: false });
          toast.success('Transaction added successfully', {
            position: toast.POSITION.TOP_CENTER,
          });
        }
      }
    } catch (err) {
      this.setState({ isTransactionformOpen: false, loader: false });
      toast.error('Somethng went wrong!', {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };

  handleForm = (budget) => {
    this.setState({ budget, isformOpen: true });
  };

  addTransaction = (budget_id, transaction = {}) => {
    this.setState({ budget_id, transaction, isTransactionformOpen: true });
  };

  editTransaction = (transaction, transactionBudget) => {
    this.setState({
      transaction,
      transactionBudget,
      isTransactionformOpen: true,
    });
  };

  deleteTransaction = async (transaction, budget_id) => {
    try {
      const res = await Axios.delete(
        `${BASE_URL}/transaction?budget_id=${budget_id}&transaction_id=${transaction.transaction_id}`
      );
      if (res) {
        this.fetchBudget();
        this.setState({ isformOpen: false });
        toast.success('Transaction deleted successfully', {
          position: toast.POSITION.TOP_CENTER,
        });
      }
    } catch (err) {
      this.setState({ isformOpen: false });
      toast.error('Somethng went wrong!', {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };

  render() {
    const {
      budgets,
      isformOpen,
      budget,
      isTransactionformOpen,
      transaction,
      transactionBudget,
      loader,
    } = this.state;
    const loading = () => (
      <ReactLoading
        type="spin"
        className="loading"
        color="blue"
        height={'10%'}
        width={'10%'}
      />
    );
    return (
      <Container className="main">
        <ToastContainer />
        {loader ? (
          loading()
        ) : (
          <Fragment>
            {!isformOpen && !isTransactionformOpen && (
              <Row className="budget-button">
                <Col md={{ span: 3, offset: 9 }}>
                  <Button
                    variant="primary"
                    onClick={() => {
                      this.setState({
                        isformOpen: true,
                        budget: {},
                        budget_id: '',
                      });
                    }}
                  >
                    {' '}
                    CREATE YOUR BUDGET
                  </Button>
                </Col>
              </Row>
            )}
            {isformOpen && (
              <Row>
                <Col md={{ span: 6, offset: 3 }}>
                  <BudgetForm
                    handleFormSubmit={this.handleFormSubmit}
                    budget={budget}
                  />
                </Col>
              </Row>
            )}

            {isTransactionformOpen && (
              <Row>
                <Col md={{ span: 6, offset: 3 }}>
                  <BudgetTransactionForm
                    handleTransactionFormSubmit={
                      this.handleTransactionFormSubmit
                    }
                    addTransaction={this.addTransaction}
                    transaction={transaction}
                    transactionBudget={transactionBudget}
                  />
                </Col>
              </Row>
            )}
            {!isformOpen && !isTransactionformOpen && (
              <Row>
                <Col md={{ span: 12 }}>
                  <BudgetList
                    budgets={budgets}
                    handleForm={this.handleForm}
                    addTransaction={this.addTransaction}
                    editTransaction={this.editTransaction}
                    deleteTransaction={this.deleteTransaction}
                  />
                </Col>
              </Row>
            )}
          </Fragment>
        )}
      </Container>
    );
  }
}
