import React, { Component } from 'react';
import PropTypes from 'prop-types';

class PhotoGrid extends Component {
  render() {
    console.log('object', this.props);
    return (
      <div className="photo-grid">
        {JSON.stringify(this.props.posts, null, '')}
      </div>
    );
  }
}

// PhotoGrid.propTypes = {

// };

export default PhotoGrid;