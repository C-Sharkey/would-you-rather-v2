import React, { Component } from 'react';
//import '../App.css';
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { handleInitialData } from '../actions/shared'
import Dashboard from './Dashboard';
import QuestionDetails from './QuestionDetails'
import QuestionResults from './QuestionResults'
import Login from './Login'
import NotFound from './NotFound'
import NewQuestion from './NewQuestion'
import Leaderboard from './Leaderboard'
import NavBar from './NavBar';

// Used react-bootsrap to style components
// Used Chirper app for reducers/middleware/reducers

// Gets initial data from DATA.js
// Sets up routes
// Redirects to 404 if route doesnt exist

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData())
  }
  render (){
    const { authedUser } = this.props 
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
                        <Route path='/' authedUser={authedUser} exact component={Dashboard} />
                        <Route path='/questions/:id' exact component={QuestionDetails} />
                        <Route path='/results/:id' exact component={QuestionResults} />
                        <Route path='/new' exact component={NewQuestion} />
                        <Route path='/leaderboard' exact component={Leaderboard} />
                        <Route path='*' component={NotFound} />
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

