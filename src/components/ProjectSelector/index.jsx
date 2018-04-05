import React, { Component } from 'react';
import PropTypes from 'prop-types';

import StorePicker from '../StorePicker';

class ProjectSelector extends Component {
  static propTypes = {
    history: PropTypes.object.isRequired
  };

  render() {
    return (
      <React.Fragment>
        <StorePicker route={this.props.history} />
      </React.Fragment>
    );
  }
}

export default ProjectSelector;