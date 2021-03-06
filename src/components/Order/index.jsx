import React, { Component } from 'react';
import localforage from 'localforage';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
// import PropTypes from 'prop-types';

import { formatPrice } from '../../utility-functions.js';
import Context from '../../Context.js';
// import OrderList from '../OrderList';

import './style.css';


class Order extends Component {
  state = { order: this.props.order }

  // static propTypes = {
  //   fishes: PropTypes.shape({
  //     fish: PropTypes.shape({
  //       image: PropTypes.string,
  //       name: PropTypes.string,
  //       desc: PropTypes.string,
  //       status: PropTypes.string,
  //       price: PropTypes.number
  //     })
  //   }).isRequired,
  //   order: PropTypes.object.isRequired,
  //   // removeFromOrder: PropTypes.func.isRequired,
  //   // userId: PropTypes.string,
  //   // clearOrder: PropTypes.func.isRequired,
  //   // storeId: PropTypes.string.isRequired
  // }




  // If add order to localforage here, sometimes it will get the initialize order state that hadnt been populated yet
  // which leads to reset the localforage
  // componentWillUpdate() {
  //   if (this.props.order) {
  //     localforage.setItem(this.props.storeId, this.props.order)
  //   }
  // }

  orderList = (key, fish, count, actions) => {
    const transitionOptions = {
      classNames: "order",
      key: key,
      timeout: { enter: 250, exit: 250 }
    }

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

            </span>
            <span className="price">
              {formatPrice(count * fish.price)}
              &nbsp;
            <button onClick={() => actions.removeFromOrder(key)}>&times;</button>
            </span>

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


  componentDidUpdate (prevProps, prevState) {
    if (this.props.userId) {
      localforage.setItem(this.props.userId, this.props.order)
      // localforage.setItem(this.props.storeId, this.props.order)
    }
  }

  render () {
    // if (this.props.order) {
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

    return (
      <Context.Consumer>
        {({ state, actions }) => (
          <div className="order-wrap">
            <h2>Your Order</h2>
            <TransitionGroup component="ul" className="order">
              {/* {orderIds.map(key => <OrderList key={key} id={key} />)} */}
              {orderIds.map(key =>
                this.orderList(key,
                               state.fishes[key],
                               state.order[key],
                               actions
                              )
              )}
            </TransitionGroup>
            <div className="total" style={{ paddingTop: 0.5 + 'em' }}>
              <strong>Total: </strong>
              <span style={{ float: 'right' }}>{formatPrice(totalPrice)}</span>
              &nbsp;
          </div>
            <button onClick={actions.clearAllOrder} className="clear-order">Clear Order</button>
          </div>
        )}
      </Context.Consumer>
    );
  }
}

export default Order;