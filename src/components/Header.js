import React, { Component, Fragment } from 'react';
import { Navbar } from 'react-bootstrap';

export default class Header extends Component {
  render() {
    return (
      <Fragment>
        <Navbar expand="lg" variant="light" bg="light">
          <Navbar.Brand href="#">Budget Planner App</Navbar.Brand>
        </Navbar>
      </Fragment>
    );
  }
}
