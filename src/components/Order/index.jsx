import React, { Component } from 'react';
import localforage from 'localforage';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import PropTypes from 'prop-types';

import { formatPrice } from '../../helpers';

import './style.css';

class Order extends Component {
  // state = { loading: true }

  static propTypes = {
    fishes: PropTypes.shape({
      fish: PropTypes.shape({
        image: PropTypes.string,
        name: PropTypes.string,
        desc: PropTypes.string,
        status: PropTypes.string,
        price: PropTypes.number
      })
    }).isRequired,
    order: PropTypes.object.isRequired
  }


  orderList = (key) => {
    const transitionOptions = {
      classNames: "order",
      key: key,
      timeout: { enter: 250, exit: 250 }
    }

    const fish = this.props.fishes[key];
    const count = this.props.order[key];

    if (!fish) return null;

    if (fish && fish.status === "available") {
      // this.setState({ loading: false });
      return (
        <CSSTransition {...transitionOptions}>
          <li key={key} className="">
            <span>
              <TransitionGroup component="span" className="count">
                <CSSTransition classNames="count" key={count} timeout={{ enter: 250, exit: 250 }}>
                  <span>{count}</span>
                </CSSTransition>
              </TransitionGroup>
              lbs {fish.name}

              <button onClick={() => this.props.removeFromOrder(key)}>&times;</button>
            </span>
            <span className="price">{formatPrice(count * fish.price)}</span>

          </li>
        </CSSTransition>
      )
    } else {
      return (
        <CSSTransition {...transitionOptions}>
          <li key={key}> Sorry, {fish ? <strong>{fish.name}</strong> : 'fish'} is no longer available </li>
        </CSSTransition>
      )
    }
  }

  // If add order to localforage here, sometimes it will get the initialize order state that hadnt been populated yet
  // which leads to reset the localforage
  // componentWillUpdate() {
  //   if (this.props.order) {
  //     localforage.setItem(this.props.storeId, this.props.order)
  //   }
  // }

  componentDidUpdate (prevProps, prevState) {
    // console.log('object', prevProps, prevState);
    // Only add order to localforage when add new order
    localforage.setItem(this.props.storeId, this.props.order)
  }


  render () {
    const orderIds = Object.keys(this.props.order);
    const totalPrice = orderIds.reduce((prevTotal, keyId) => {
      const fish = this.props.fishes[keyId];
      const count = this.props.order[keyId];
      const isAvailable = fish && fish.status === "available";
      if (isAvailable) {
        return prevTotal + count * fish.price;
      }
      return prevTotal;
    }, 0)

    // const order = this.props.order;
    // const totalPrice = order.reduce((prevTotal, item) => {
    //   const count = item.count;
    //   const isAvailable = item && item.status === "available";
    //   if (isAvailable) {
    //     return prevTotal + count * item.price
    //   }
    //   return prevTotal;
    // }, 0)

    return (
      <div className="order-wrap">
        <h2>Your Order</h2>
        <TransitionGroup component="ul" className="order">
          {orderIds.map(key => this.orderList(key))}
        </TransitionGroup>
        <div className="total" style={{ paddingTop: 0.5 + 'em' }}>
          <strong>Total: </strong>
          <span style={{ float: 'right' }}>{formatPrice(totalPrice)}</span>
        </div>
      </div>
    );
  }
}

export default Order;