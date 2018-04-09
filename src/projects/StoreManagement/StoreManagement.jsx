import React, { Component } from 'react';
// import localforage from 'localforage';
// import firebase from 'firebase';

import Provider from '../../Provider';
// import sampleFishes from './sample-fishes';
// import base, { firebaseApp } from '../../firebase.js';

import './StoreManagement.css';
import './style.css';

import Context from '../../Context.js';
import Header from '../../components/Header';
import Menu from '../../components/Menu';
import Inventory from '../../components/Inventory';
import Order from '../../components/Order';


class StoreManagement extends Component {
  state = {
    storeId: this.props.match.params.storeId
  }

  render () {
    return (
      <Provider storeId={this.state.storeId}>
        <Context.Consumer>
          {({ state, actions }) => (
            <div className="store-management">
              <div className="menu">
                <Header tagline="Fresh Seafood Market" />
                <Menu />
              </div>

              {/* Should not pass all the state to component */}
              {/* <Order {...this.state} /> */}
              <Order
              userId={state.userId}
              fishes={state.fishes}
              order={state.order}
              />
              <Inventory
                userId={state.userId}
                // storeId={this.props.match.params.storeId}
                owner={state.owner}
                fishes={state.fishes}
                // addFish={this.addFish}
                // updateFish={this.updateFish}
                // deleteFish={this.deleteFish}
                // loadSampleFishes={this.loadSampleFishes}
                // authenticate={this.authenticate}
                // logoutHandler={this.logoutHandler}
              />

            </div>
          )}
        </Context.Consumer>
      </Provider>
    );
  }
}

export default StoreManagement;
