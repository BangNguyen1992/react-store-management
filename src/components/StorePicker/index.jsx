import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { getFunName } from '../../helpers';
import './style.css';

class StorePicker extends Component {
  static propType = {
    history: PropTypes.object.isRequired
  }

  state = {
    someKey: 'someValue',
    input: ''
  }

  myInput = React.createRef();

  // Use this arrow function for auto binding to 'this'
  goToStore = (event) => {
    // stop form from submiting
    event.preventDefault();

    // get text from the input
    const myStore = this.myInput.current.value;

    // change page to store/{user input}
    this.props.history.push(`/store/${myStore}`);
  }
  componentDidMount () {
    this.setState({ someKey: 'otherValue' });
  }

  render () {
    return (
      <form className="store-selector" onSubmit={this.goToStore}>

        <h2 style={{ textTransform: "capitalize" }}>Please enter a store</h2>
        <input
          type="text"
          required
          ref={this.myInput}
          // onChange={handleOnChange}
          placeholder="Store Name"
          defaultValue={getFunName()}
        />
        <button type="submit"> Visit Store -> </button>
      </form>
    )
  }
}

export default StorePicker;
