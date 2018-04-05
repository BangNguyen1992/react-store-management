import React, { Component } from 'react';
import PropTypes from 'prop-types';
import firebase from 'firebase';

// import { formatPrice } from 'helpers';
import base, { firebaseApp } from 'firebase.js';

import AddFishForm from '../AddFishForm';
import EditFishForm from '../EditFishFrom';
import Login from '../Login';
import './style.css';



class Inventory extends Component {
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
    addFish: PropTypes.func.isRequired,
    loadSampleFishes: PropTypes.func.isRequired,
    updateFish: PropTypes.func.isRequired,
    deleteFish: PropTypes.func.isRequired,
    storeId: PropTypes.string.isRequired
  }

  state = {
    title: 'Inventory',
    uid: null,
    owner: null
  }


  authHandler = async (authData) => {
    // Look up the current store in the firebase database
    const store = await base.fetch(this.props.storeId, { contex: this })
    // Claim it if there is no owner
    // console.log('object', store);
    if (!store.hasOwnProperty('owner')) {
      await base.post(`${this.props.storeId}/owner`, {
        data: authData.user.uid
      })
    }
    // Set the state of the inventory component to reflect  the current owner
    this.setState({
      uid: authData.user.uid,
      owner: store.owner || authData.user.uid
    })
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
      uid: null,
      owner: null
    })
  }

  async componentDidMount () {
    const store = await base.fetch(this.props.storeId, { contex: this })

    await this.setState({
      uid: firebase.auth().currentUser.uid,
      owner: store.owner
    })
  }

  render () {
    const logout = <button onClick={this.logoutHandler}>Log Out!</button>;

    // console.log('object', );
    // base.collection("categories").valueChanges().map(document => {
    //   return document(a => {
    //     const data = a.payload.doc.data();//Here is your content
    //     const id = a.payload.doc.id;//Here is the key of your document
    //     return { id, ...data };
    //   });
    // })

    if (!firebase.auth().currentUser) {
      return <Login authenticate={this.authenticate} />
    }

    if (this.state.uid !== this.state.owner) {
      return (
        <div className="login">
          <h2>Sorry, you are not the owner</h2>
          <div className="button-wrap">
            {logout}
          </div>
        </div>
      )
    }

    return (
      <div className="inventory">
        {/* {this.props.title} */}
        <h2>{this.state.title}</h2>
        {Object.keys(this.props.fishes).map(key =>
          <EditFishForm
            key={key}
            fishId={key}
            fish={this.props.fishes[key]}
            updateFish={this.props.updateFish}
            deleteFish={this.props.deleteFish}
          />
        )}
        <AddFishForm addFish={this.props.addFish} />
        <div className="button-wrap">
          <button onClick={this.props.loadSampleFishes}>Load Sample Fishes</button>
          {logout}
        </div>
      </div>
    );
  }
}


export default Inventory;