import React, { Component } from 'react';
import PropTypes from 'prop-types';

class EditFishForm extends Component {
  // nameRef = React.createRef();
  // priceRef = React.createRef();
  // statusRef = React.createRef();
  // descRef = React.createRef();
  // imageRef = React.createRef();

  handleChange = (event) => {
    // Take a copy of current fish
    const updatedFish = {
      ...this.props.fish,
      [event.target.name]: event.target.value
    };

    // console.log('object 1', updatedFish);
    this.props.updateFish(this.props.fishId, updatedFish);
  }

  render () {
    return (
      <div className="fish-edit">
        <input
          name="name"
          onChange={this.handleChange}
          value={this.props.fish.name}
          // ref={this.nameRef}
          type="text"
          // placeholder="Name"
        />

        <input name="price"
          onChange={this.handleChange}
          value={this.props.fish.price}
          // ref={this.priceRef}
          type="text"
          // placeholder="Price"
        />

        <select
          name="status"
          onChange={this.handleChange}
          value={this.props.fish.status}
          // ref={this.statusRef}
        >
          <option value="available">Fresh!</option>
          <option value="unavailable">Sold Out!</option>
        </select>

        <textarea name="desc"
          onChange={this.handleChange}
          value={this.props.fish.desc}
          // ref={this.descRef}
          type="text"
          // placeholder="Desc"
        />

        <input
          name="image"
          onChange={this.handleChange}
          value={this.props.fish.image}
          // ref={this.imageRef}
          type="text"
          // placeholder="Image"
        />

        <button onClick={() => this.props.deleteFish(this.props.fishId)}>Remove Fish</button>
      </div>
    );
  }
}

EditFishForm.propTypes = {
  fishId: PropTypes.string.isRequired,
  fish: PropTypes.shape({
    image: PropTypes.string,
    name: PropTypes.string,
    desc: PropTypes.string,
    status: PropTypes.string,
    price: PropTypes.number
  }).isRequired,
  updateFish: PropTypes.func.isRequired,
  deleteFish: PropTypes.func.isRequired,
}

export default EditFishForm;