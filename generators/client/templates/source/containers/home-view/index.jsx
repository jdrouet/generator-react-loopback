import React, {Component, PropTypes} from 'react'
import {bindActionCreators} from 'redux'
import {connect, Provider} from 'react-redux'

class HomeView extends Component {

  render() {
    return (
      <div>Coucou</div>
    )
  }

};

HomeView.propTypes = {
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
)(HomeView);
