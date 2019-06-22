import React, { Component } from 'react';
import PropTypes from 'prop-types';

import NavBar from '../NavBar';
import Header from './Header';

class Root extends Component {
  render() {
    const { children } = this.props;

    return (
      <div className="wrapper">
        <Header />
        <NavBar />
        <div className="wrapper__page-content">
          {children}
        </div>
        <div className="wrapper__footer">
          footer
        </div>

      </div>
    );
  }
}

Root.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Root;
