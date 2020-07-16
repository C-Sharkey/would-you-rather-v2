import React, { Component } from 'react';
import '../App.css';
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route } from "react-router-dom";
import { handleInitialData } from '../actions/shared'
import Dashboard from './Dashboard';
import QuestionDetails from './QuestionDetails'
import Login from './Login'
import NotFound from './NotFound'
import NewQuestion from './NewQuestion'
import Leaderboard from './Leaderboard'


class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData())
  }
  render (){
    return (
        <Router>
          <div className="App">          
            
              <Route path='/' exact component={Login} />
              <Route path='/dashboard' exact component={Dashboard} />
              <Route path='/new' exact component={NewQuestion} />
              <Route path='/leaderboard' exact component={Leaderboard} />
              <Route path='/404' exact component={NotFound} />
          
          </div>
        </Router>
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

