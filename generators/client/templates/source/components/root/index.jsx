import React, {Component, PropTypes} from 'react'
import {bindActionCreators} from 'redux'
import {connect, Provider} from 'react-redux'

import AppBar from 'material-ui/AppBar'

class Root extends Component {

  render() {
    return (
      <div>
        <AppBar />
        <div>{this.props.children}</div>
      </div>
    )
  }

};

Root.propTypes = {
};

function mapStateToProps(state) {
  return {
  }
}

function mapDispatchToProps(dispatch) {
  return {
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Root);
