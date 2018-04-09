import React, { Component } from 'react';
// import PropTypes from 'prop-types';

import Context from '../../Context.js';

import './style.css';

class Login extends Component {
  render () {
    const faceBookStyle = 'loginBtn loginBtn--facebook';
    const googleStyle = 'loginBtn loginBtn--google';
    const githubStyle = 'loginBtn loginBtn--github';

    return (
      <Context.Consumer>
        {({ state, actions }) => (
          <nav className="login">
            <h2>Inventory Login</h2>
            <p>Sign in to manage your store's inventory</p>
            <button className={githubStyle} onClick={() => actions.authenticate('Github')}> Login With Github </button>

            <button className={faceBookStyle} onClick={() => actions.authenticate('Facebook')}> Login With Facebook </button>

            <button className={googleStyle} onClick={() => actions.authenticate('Google')}> Login With Google </button>

          </nav>
        )}
      </Context.Consumer>
    );
  }
}

export default Login;