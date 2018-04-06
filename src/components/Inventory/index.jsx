import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import firebase from 'firebase';

// import { formatPrice } from 'helpers';
// import base from 'firebase.js';

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
    storeId: PropTypes.string.isRequired,
    userId: PropTypes.string,
    owner: PropTypes.string,
    authenticate: PropTypes.func.isRequired,
    logoutHandler: PropTypes.func.isRequired
  }

  state = {
    title: 'Inventory',
    uid: this.props.userId,
    // owner: this.props.owner
  }


  // async componentDidMount () {
  //   const store = await base.fetch(this.props.storeId, { contex: this });

  //   if (store) {
  //     await firebase.auth().onAuthStateChanged((user) => {
  //       if (user) {
  //         this.setState({
  //           uid: user.uid,
  //           owner: store.owner
  //         })
  //       }
  //     }); 
  //   }
  // }

  static getDerivedStateFromProps (nextProps, prevState) {
    prevState.uid = nextProps.userId;
    // prevState.owner = nextProps.owner;
    return nextProps;
  }

  render () {
    // console.log('object', this.props.owner);
    const logout = <button onClick={this.props.logoutHandler}>Log Out!</button>;

    if (!this.state.uid || !this.props.owner) {
      return <Login authenticate={this.props.authenticate} />
    }

    if (this.state.uid !== this.props.owner) {
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