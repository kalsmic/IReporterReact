import React, { Component } from 'react';
import PropTypes from 'prop-types';

import NavBar from '../NavBar';
import Header from './Header';
import Footer from './Footer';

class Root extends Component {
  render() {
    const { children } = this.props;

    return (
      <div className="wrapper">
        <Header />
        <div className="wrapper__menu border-round-lg">
          <NavBar />
        </div>
        <div className="wrapper__page-content border-round-lg">
          {children}
        </div>
        <Footer />
      </div>
    );
  }
}

Root.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Root;
