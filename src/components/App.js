import React, { Component } from 'react';
import '../App.css';
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { handleInitialData } from '../actions/shared'
import Dashboard from './Dashboard';
import QuestionDetails from './QuestionDetails'
import Login from './Login'
import NotFound from './NotFound'
import NewQuestion from './NewQuestion'
import Leaderboard from './Leaderboard'
import NavBar from './NavBar';


class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData())
  }
  render (){
    const { authedUser } = this.props 
    console.log('app auth user: ', authedUser) 
    return (
        <Router>
          <div className="App">          
          {authedUser === null ? (
              <Route render={() => (
                <Route path='/' component={Login} />
              )}
              />
            ) : (
              <div>
                <NavBar loggedInID={authedUser} /> 
                <Switch>
                  <Route path='/' exact component={Dashboard} />
                  <Route path='/new' exact component={NewQuestion} />
                  <Route path='/leaderboard' exact component={Leaderboard} />
                  <Route path='/404' component={NotFound} />
                </Switch>
              </div>
            )}
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

