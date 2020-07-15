import React, { Component } from 'react';
import '../App.css';
import { connect } from 'react-redux'
import { Router, Route, Switch } from "react-router";
import { handleInitialData } from '../actions/shared'
import Dashboard from './Dashboard';
import QuestionDetails from './QuestionDetails'


class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData())
  }
  render (){
    return (

        <div className="App">          
          {
            <Dashboard />
          }
        </div>
      
    )
  }
}

function mapStateToProps ({ authedUser }) {
  return {
    loading: authedUser === null,
    authedUser
  }
}
export default connect(mapStateToProps)(App);

