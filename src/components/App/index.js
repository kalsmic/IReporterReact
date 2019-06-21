import React, { Component } from 'react';
import '../../assets/Main.scss';

class IReporterApp extends Component {
  render() {
    return (
      <div data-test="welcomeHeader">
        <h1>
          Welcome to
          {' '}
          <span id="logo">iReporter</span>
          {' '}
React
        </h1>
      </div>
    );
  }
}

export default IReporterApp;
