import React, { Component } from 'react';

import Context from '../../Context.js';
import { formatPrice } from '../../utility-functions.js';

class EditFishForm extends Component {
  // nameRef = React.createRef();
  // priceRef = React.createRef();
  // statusRef = React.createRef();
  // descRef = React.createRef();
  // imageRef = React.createRef();

  render () {
    return (
      <Context.Consumer>
        {({ state, actions }) => (
          <div className="fish-edit">
            <input
              name="name"
              onChange={(event) => actions.updateFish(event, this.props.fishId)}
              value={`Name: ${state.fishes[this.props.fishId].name}`}
              // ref={this.nameRef}
              type="text"
            // placeholder="Name"
            />

            <input name="price"
              onChange={(event) => actions.updateFish(event, this.props.fishId)}
              value={`Price: ${formatPrice(state.fishes[this.props.fishId].price)}`}
              // ref={this.priceRef}
              type="text"
            // placeholder="Price"
            />

            <select
              name="status"
              onChange={(event) => actions.updateFish(event, this.props.fishId)}
              value={state.fishes[this.props.fishId].status}
            // ref={this.statusRef}
            >
              <option value="available">Fresh!</option>
              <option value="unavailable">Sold Out!</option>
            </select>

            <textarea name="desc"
              onChange={(event) => actions.updateFish(event, this.props.fishId)}
              value={state.fishes[this.props.fishId].desc}
              // ref={this.descRef}
              type="text"
            // placeholder="Desc"
            />

            <input
              name="image"
              onChange={(event) => actions.updateFish(event, this.props.fishId)}
              value={state.fishes[this.props.fishId].image}
              // ref={this.imageRef}
              type="text"
            // placeholder="Image"
            />

            <button onClick={() => actions.deleteFish(this.props.fishId)}>Remove Fish</button>
          </div>
        )}

      </Context.Consumer>
    );
  }
}

export default EditFishForm;