import React, { Component } from 'react';
import localforage from 'localforage';
import firebase from 'firebase';
// import logo from 'images/logo.svg';
import './App.css';
import './starterFiles.css';
import sampleFishes from './sample-fishes';
import base, { firebaseApp } from './firebase.js';

import Header from './components/Header';
import Menu from './components/Menu';
import Inventory from './components/Inventory';
import Order from './components/Order';


let currentUserId;

firebase.auth().onAuthStateChanged(function (user) {
  if (user) {
    // User is signed in.
    currentUserId = user.uid;
  } else {
    // No user is signed in.
  }
});

class App extends Component {
  state = {
    userId: null,
    loading: true,
    fishes: {},
    order: {},
    uid: null,
    owner: null
  }

  componentDidMount () {
    // localforage.getItem(this.props.match.params.storeId).then(value => {
    //   if (value) {
    //     this.setState({ order: value })
    //   }
    // });

    this.ref = base.syncState(`${this.props.match.params.storeId}/fishes`, {
      context: this,
      state: 'fishes',
      asArray: false,
      keepKeys: false, //will keep any firebase generated keys intact when manipulating data using the asArray option.
      then: () => {
        this.setStoreOwner();
        this.setState({ userId: currentUserId });
        localforage.getItem(currentUserId).then(value => {
          if (value) this.setState({ order: value })
        });
      }, // this will make componentWillUpdate run again
      onFailure: (error) => console.log('Error: ', error)
    });
  }

  // stop listening to changes in database when component is unmounted
  componentWillUnmount () {
    base.removeBinding(this.ref);
  }

  //
  setStoreOwner = async () => {
    const store = await base.fetch(this.props.match.params.storeId, { contex: this });
    this.setState({ owner: store.owner })
  }

  loadSampleFishes = () => {
    this.setState({ fishes: sampleFishes })
  }

  addFish = fish => {
    // Take a copy of the existing state
    const fishes = { ...this.state.fishes };
    // Add new fish to that fishes variable
    fishes[`fish${Date.now()}`] = fish;

    this.setState({ fishes });
  }

  updateFish = (key, updatedFish) => {
    const fishes = { ...this.state.fishes };
    fishes[key] = updatedFish;

    this.setState({ fishes });
  }

  deleteFish = (key) => {
    // remove fish from inventory
    const fishes = { ...this.state.fishes };
    // need set item to null so that firebase will also remove it
    fishes[key] = null;

    // remove fish from order
    const order = { ...this.state.order };
    delete order[key];

    this.setState({ fishes, order });
  }

  addToOrder = (key) => {
    const order = { ...this.state.order };
    order[key] = order[key] + 1 || 1;

    this.setState({ order });
  }

  removeFromOrder = (key) => {
    const order = { ...this.state.order };
    delete order[key];

    this.setState({ order });
  }

  clearOrder = () => {
    // localforage.removeItem(this.props.match.params.storeId, () => {
    //   this.setState({ order: {} });
    // })

    localforage.removeItem(this.state.user.uid, () => {
      this.setState({ order: {} });
    })
  }

  authHandler = async (authData) => {
    // Look up the current store in the firebase database
    const store = await base.fetch(this.props.match.params.storeId, { contex: this })
    // Claim it if there is no owner
    if (!store.hasOwnProperty('owner')) {
      await base.post(`${this.props.match.params.storeId}/owner`, {
        data: authData.user.uid
      })
    }
    // Set the state of the inventory component to reflect  the current owner
    this.setState({
      userId: authData.user.uid,
      owner: store.owner || authData.user.uid
    })

    localforage.getItem(authData.user.uid).then(value => {
      if (value) this.setState({ order: value })
    });
  }

  authenticate = (provider) => {
    const authProvider = new firebase.auth[`${provider}AuthProvider`]();

    firebaseApp
      .auth()
      .signInWithPopup(authProvider)
      .then(this.authHandler);
  };

  logoutHandler = async () => {
    await firebase.auth().signOut();
    this.setState({
      userId: null,
      order: {}
    })
  }

  render () {
    return (
      <div className="App catch-of-the-day">
        <div className="menu">
          <Header tagline="Fresh Seafood Market" />
          <Menu fishes={this.state.fishes} addToOrder={this.addToOrder} />
        </div>
        {/* Should not pass all the state to component */}
        {/* <Order {...this.state} /> */}
        <Order
          userId={this.state.userId}
          // storeId={this.props.match.params.storeId}
          fishes={this.state.fishes}
          order={this.state.order}
          removeFromOrder={this.removeFromOrder}
          clearOrder={this.clearOrder}

        />
        <Inventory
          userId={this.state.userId}
          storeId={this.props.match.params.storeId}
          owner={this.state.owner}
          fishes={this.state.fishes}
          addFish={this.addFish}
          updateFish={this.updateFish}
          deleteFish={this.deleteFish}
          loadSampleFishes={this.loadSampleFishes}
          authenticate={this.authenticate}
          logoutHandler={this.logoutHandler}
        />

      </div>
    );
  }
}

export default App;
