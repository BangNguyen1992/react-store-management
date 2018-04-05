import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Fish from 'components/Fish';


class Menu extends Component {
  render () {
    return (
      // <ul className="fishes">
      //   {this.props.fishes.map(item => (
      //     <Fish key={item.id} details={item} addToOrder={this.props.addToOrder} />
      //   ))}
      // </ul>
      <ul className="fishes">
        {Object.keys(this.props.fishes).map(key => (
          <Fish key={key} fishId={key} details={this.props.fishes[key]} addToOrder={this.props.addToOrder} />
        ))}
      </ul>
    );
  }
}

Menu.propTypes = {
  fishes: PropTypes.shape({
    fish: PropTypes.shape({
      image: PropTypes.string,
      name: PropTypes.string,
      desc: PropTypes.string,
      status: PropTypes.string,
      price: PropTypes.number
    })
  }).isRequired,
  addToOrder: PropTypes.func.isRequired
}

export default Menu;