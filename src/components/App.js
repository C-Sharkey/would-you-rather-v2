import React, { Component } from 'react';
import '../App.css';
import { connect } from 'react-redux'
import { handleInitialData } from '../actions/shared'


class App extends Component {
  componentDidMount(){
    this.props.dispatch(handleInitialData)
  }
  render (){
    return (
      <div className="App">
        Would you rather 2...
      </div>
    );
  }

}
export default connect()(App);

