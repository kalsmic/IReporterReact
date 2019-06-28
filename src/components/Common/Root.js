import React, { Component } from 'react';
import NavBar from '../NavBar';

class Root extends Component {
  render() {
    const { children } = this.props;

    return (
      <div className="wrapper">
        <div className="wrapper__header">
          Header
        </div>
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

export default Root;
