import React, { Component } from 'react';
import PropTypes from 'prop-types';

import StorePicker from '../StorePicker';

class ProjectSelector extends Component {
  static propTypes = {
    history: PropTypes.object.isRequired
  };

  render() {
    return (
      <div className="store-management">
        <StorePicker route={this.props.history} />
      </div>
    );
  }
}

export default ProjectSelector;