import React, { Component } from 'react';

import Fish from 'components/Fish';
import Context from '../../Context.js';

class Menu extends Component {
  render () {
    return (
      <Context.Consumer>
        {({ state, actions }) => (
          <ul className="fishes">
            {Object.keys(state.fishes).map(key => (
              <Fish key={key} fishId={key} fish={state.fishes[key]} />
            ))}
          </ul>
        )}
      </Context.Consumer>
    );
  }
}

export default Menu;