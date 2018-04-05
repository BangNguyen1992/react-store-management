import React, { Component } from 'react';
import localforage from 'localforage';
// import logo from 'images/logo.svg';
import './App.css';
import './starterFiles.css';
import sampleFishes from './sample-fishes';

import Header from './components/Header';
import Menu from './components/Menu';
import Inventory from './components/Inventory';
import Order from './components/Order';

import base from 'firebase.js';


class App extends Component {
  state = {
    loading: true,
    fishes: {},
    order: {}
  }

  componentDidMount () {
    localforage.getItem(this.props.match.params.storeId).then(value => {
      if (value) {
        this.setState({ order: value })
      }
    });

    this.ref = base.syncState(`${this.props.match.params.storeId}/fishes`, {
      context: this,
      state: 'fishes',
      // asArray: true,
      // keepKeys: true, //will keep any firebase generated keys intact when manipulating data using the asArray option.
      then: () => this.setState({ loading: false }), // this will make componentWillUpdate run again
      onFailure: (error) => console.log('Error: ', error)
    });
  }

  // UNSAFE_componentWillUpdate () {
  //   console.log('object', JSON.stringify(this.state.order));
  //   // alert(this.state.order)
  //   localStorage.setItem(this.props.match.params.storeId, JSON.stringify(this.state.order));
  //   // localStorage.setItem(this.props.match.params.storeId, JSON.stringify(this.state.order))
  // }

  // stop listening to changes in database when component is unmounted
  componentWillUnmount () {
    base.removeBinding(this.ref);
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

    // if (fish.name && fish.price && fish.desc && fish.image) {
    //   fishes[fishes.length] = fish;

    //   this.setState({ fishes })
    // }
  }

  updateFish = (key, updatedFish) => {
    // // take a copy of current state
    // const fishes = [...this.state.fishes];
    // // update that state
    // const originalFishIndex = fishes.findIndex(fish => fish.id === updatedFish.id);
    // fishes[originalFishIndex] = updatedFish;

    // // set that to state
    // this.setState({ fishes });

    const fishes = {...this.state.fishes};
    fishes[key] = updatedFish;

    this.setState({ fishes });
  }

  deleteFish = (key) => {
    // remove fish from inventory
    const fishes = {...this.state.fishes};
    // need set item to null so that firebase will also remove it
    fishes[key] = null;

    // remove fish from order
    const order = {...this.state.order};
    delete order[key];

    this.setState({ fishes, order });
  }

  addToOrder = (key) => {
    // if (newItem.id && newItem.name && newItem.price && newItem.desc && newItem.image) {
    //   const order = [...this.state.order];

    //   const existedOrder = order.find(myOrder => myOrder.id === newItem.id);
    //   if (existedOrder) {
    //     existedOrder.count = existedOrder.count + 1 || 1;
    //   } else {
    //     const myItem = newItem;
    //     myItem.count = 1;
    //     order[order.length] = myItem;
    //   }

    //   this.setState({ order })
    // }

    const order = { ...this.state.order };
    order[key] = order[key] + 1 || 1;

    this.setState({ order });
  }

  removeFromOrder = (key) => {
    // let order = {...this.state.order};
    // const fishInOrderIndex = order.findIndex(fish => fish.id === key);

    // order.splice(fishInOrderIndex, 1);

    // this.setState({ order });
    
    const order = {...this.state.order};
    delete order[key];

    this.setState({ order });
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
          storeId={this.props.match.params.storeId}
          fishes={this.state.fishes}
          order={this.state.order}
          removeFromOrder={this.removeFromOrder}
        />
        <Inventory
          fishes={this.state.fishes}
          addFish={this.addFish}
          updateFish={this.updateFish}
          deleteFish={this.deleteFish}
          loadSampleFishes={this.loadSampleFishes}
          storeId={this.props.match.params.storeId}
        />

      </div>
    );
  }
}

export default App;
