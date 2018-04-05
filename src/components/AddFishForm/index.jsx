import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './style.css';

class AddFishForm extends Component {
  nameRef = React.createRef();
  priceRef = React.createRef();
  statusRef = React.createRef();
  descRef = React.createRef();
  imageRef = React.createRef();

  createFish = (event) => {
    event.preventDefault();
    // console.log('object event', event.target.price);
    const fish = {
      name: this.nameRef.current.value,
      price: parseFloat(this.priceRef.current.value),
      status: this.statusRef.current.value,
      desc: this.descRef.current.value,
      image: this.imageRef.current.value,
    }

    const keys = Object.keys(fish);
    keys.forEach(key => {
      if (!fish[key]) {
        alert(`There is no ${key}`);
      }
    });
    // const valueArr = Object.values(fish);
    // valueArr.forEach(item => {
    //   if (item) {
    //     alert(`There is no ${item}`);
    //   }
    // });

    if (Object.values(fish).every(Boolean)) {
      this.props.addFish(fish);
      // refresh the form
      event.target.reset();
    }

  }
  render () {
    return (
      // <div className="AddFishForm">
      <form className="fish-edit" onSubmit={this.createFish}>
        <input name="name" ref={this.nameRef} type="text" placeholder="Name" />
        <input name="price" ref={this.priceRef} type="text" placeholder="Price" />
        <select name="status" ref={this.statusRef}>
          <option value="available">Fresh!</option>
          <option value="unavailable">Sold Out!</option>
        </select>
        <textarea name="desc" ref={this.descRef} type="text" placeholder="Desc" />
        <input name="image" ref={this.imageRef} type="text" placeholder="Image" />
        <button type="submit">+ Add Fish</button>
      </form>
      // </div>
    );
  }
}

AddFishForm.propTypes = {
  addFish: PropTypes.func.isRequired
}

export default AddFishForm;