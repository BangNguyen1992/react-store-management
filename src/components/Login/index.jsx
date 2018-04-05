import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './style.css';

class Login extends Component {
  static propTypes = {
    authenticate: PropTypes.func.isRequired
  }

  render() {
    const faceBookStyle = 'loginBtn loginBtn--facebook';
    const googleStyle = 'loginBtn loginBtn--google';
    const githubStyle = 'loginBtn loginBtn--github';

    return (
      <nav className="login">
        <h2>Inventory Login</h2>
        <p>Sign in to manage your store's inventory</p>
        <button className={githubStyle}  onClick={() => this.props.authenticate('Github')}> Login With Github </button>

        <button className={faceBookStyle} onClick={() => this.props.authenticate('Facebook')}> Login With Facebook </button>

        <button className={googleStyle} onClick={() => this.props.authenticate('Google')}> Login With Google </button>

      </nav>
    );
  }
}

export default Login;