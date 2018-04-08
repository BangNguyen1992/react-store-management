import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from './actions/actionCreators';


import App from './App';


function mapStateToProps (state) {
  return {
    posts: state.posts,
    comments: state.comments
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators(actionCreators, dispatch);
}

const ReduxStagram = connect(mapStateToProps, mapDispatchToProps)(App);

export default ReduxStagram;