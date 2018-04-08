import React, { Component } from 'react';
// import PropTypes from 'prop-types';

import PhotoGrid from 'components/PhotoGrid';

import './animation.css';
import './normalize.css';
import './typography.css';
import './ReduxStagram.css';


class App extends Component {
  render() {
    // console.log('object app', this.props);

    return (
      <div className="reduxstagram">
        <h1>ReduxStagram</h1>
        <PhotoGrid/>
      </div>
    );
  }
}

// ReduxStagram.propTypes = {

// };

export default App;