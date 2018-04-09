import React from 'react'
import Context from '../../Context.js';

const LogoutBtn = () => (
  <Context.Consumer>
    {({ state, actions }) => (
      <button onClick={() => actions.logoutHandler()}>Log Out!</button>
    )}
  </Context.Consumer>
)

export default LogoutBtn;