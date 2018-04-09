import React, { Component } from 'react';
// import PropTypes from 'prop-types';

import Context from '../../Context.js';
import { formatPrice } from '../../utility-functions.js';
import './style.css';

class Fish extends Component {
  // static propTypes = {
  //   details: PropTypes.shape({
  //     image: PropTypes.string,
  //     name: PropTypes.string,
  //     desc: PropTypes.string,
  //     status: PropTypes.string,
  //     price: PropTypes.number
  //   }).isRequired,
  //   addToOrder: PropTypes.func.isRequired
  // }

  // handleClick = () => {
  //   this.props.addToOrder(this.props.fishId);
  // }

  render () {
    const { image, name, desc, price, status } = this.props.fish;
    const isAvailable = status === "available";
    return (
      <Context.Consumer>
        {({state, actions}) => (
          <React.Fragment>
            <li className="menu-fish">
              <img src={image} alt={name} />
              <h3 className="fish-name">
                {name}
                <span className="price">{formatPrice(price)}</span>
              </h3>
              <p>{desc}</p>
              <button disabled={!isAvailable} onClick={() => actions.addToOrder(this.props.fishId)}>{isAvailable ? "Add To Cart" : "Sold Out"}</button>
            </li>
          </React.Fragment>
        )}

      </Context.Consumer>
    );
  }
}

export default Fish;