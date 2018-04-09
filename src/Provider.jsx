import React, { Component } from 'react';
import localforage from 'localforage';
import firebase from 'firebase';

import Context from './Context.js';
import base, { firebaseApp } from './firebase.js';
import sampleFishes from './projects/StoreManagement/sample-fishes';

import logo from 'images/logo.svg';
import './App.css';

class Provider extends Component {
  state = {
    userId: null,
    storeId: this.props.storeId,
    loading: true,
    fishes: {},
    order: {},
    uid: null,
    owner: null,
    isLoading: true
  }

  async componentWillMount () {
    this.ref = await base.syncState(`${this.state.storeId}/fishes`, {
      context: this,
      state: 'fishes',
      asArray: false,
      keepKeys: false, //will keep any firebase generated keys intact when manipulating data using the asArray option.
      then: () => {
        this.setStoreOwner();
        // this.setUserId();
        this.setState({ userId: firebase.auth().currentUser.uid });

        localforage.getItem(firebase.auth().currentUser.uid).then(value => {
          if (value) this.setState({ order: value })
        });

        this.setState({ isLoading: false })
      }, // this will make componentWillUpdate run again
      onFailure: (error) => console.log('Error: ', error)
    });
  }

  componentWillUnmount () {
    base.removeBinding(this.ref);
  }

  // SET STORE OWNERSHIP
  setStoreOwner = async () => {
    const store = await base.fetch(this.state.storeId, { contex: this });

    this.setState({ owner: store.owner })
  }

  // SET CURRENT USER LOGED IN
  // setUserId = async () => {
  //   const self = this;
  //   await firebase.auth().onAuthStateChanged(function (user) {
  //     if (user) {
  //       // User is signed in.
  //       self.setState({ userId: user.uid });
  //     } else {
  //       // No user is signed in.
  //     }
  //   });
  // }

  // HANDLE AUTHENTICATION
  authHandler = async (authData) => {
    // Look up the current store in the firebase database
    const store = await base.fetch(this.state.storeId, { contex: this })
    // Claim it if there is no owner
    if (!store.hasOwnProperty('owner')) {
      await base.post(`${this.state.storeId}/owner`, {
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

  // SETUP AUTHENTICATION PROVIDER
  authenticate = (provider) => {
    const authProvider = new firebase.auth[`${provider}AuthProvider`]();

    firebaseApp
      .auth()
      .signInWithPopup(authProvider)
      .then(this.authHandler);
  };

  // HANDLE LOG OUT
  logoutHandler = async () => {
    await firebase.auth().signOut();
    this.setState({
      userId: null,
      order: {}
    })
  }

  //  LOAD SAMPLE FISH TO INVENTORY
  loadSampleFishes = () => {
    this.setState({ fishes: sampleFishes })
  }

  // ADD FISH TO INVENTORY
  addFish = fish => {
    // Take a copy of the existing state
    const fishes = { ...this.state.fishes };
    // Add new fish to that fishes variable
    fishes[`fish${Date.now()}`] = fish;

    this.setState({ fishes });
  }

  // UPDATE FISH INFO IN INVENTORY
  updateFish = (event, fishId) => {
    // Take a copy of current fish
    const fishes = { ...this.state.fishes };

    // Get new updated fish
    const updatedFish = {
      ...this.state.fishes.fishId,
      [event.target.name]: event.target.value
    };

    // Update that fish
    fishes[fishId] = updatedFish;

    // Apply new fish to state and will automatically sync with firebase database
    this.setState({ fishes });
  }

  // REMOVE SPECIFIC FISH FROM INVENTORY
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

  // ADD FISH TO ORDER
  addToOrder = (key) => {
    const order = { ...this.state.order };
    order[key] = order[key] + 1 || 1;

    this.setState({ order });
  }

  // REMOVE SPECIFIC FISH FROM ORDER
  removeFromOrder = (key) => {
    const order = { ...this.state.order };
    delete order[key];

    this.setState({ order });
  }

  // CLEAR ALL FISH FROM ORDER
  clearAllOrder = () => {
    localforage.removeItem(this.state.userId, () => {
      this.setState({ order: {} });
    })
  }

  render () {
    if (!this.state.isLoading) {
      // console.log('object this.state.fishes', this.state.fishes, this.state.order);
      return (
        <Context.Provider value={{
          state: this.state,
          actions: {
            setStoreOwner: this.setStoreOwner,
            authHandler: this.authHandler,
            authenticate: this.authenticate,
            logoutHandler: this.logoutHandler,
            loadSampleFishes: this.loadSampleFishes,
            addFish: this.addFish,
            onUpdateFish: this.onUpdateFish,
            updateFish: this.updateFish,
            deleteFish: this.deleteFish,
            addToOrder: this.addToOrder,
            removeFromOrder: this.removeFromOrder,
            clearAllOrder: this.clearAllOrder
          }
        }}>
          {this.props.children}
          {/* <StoreManagement/> */}
        </Context.Provider>
      );
    } else {
      return (
        <div className="App">
          <div className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            {/* <h2>Welcome to {this.state.storeId}</h2> */}
          </div>
        </div>
      )
    }

  }
}

export default Provider;