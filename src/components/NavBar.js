import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { handleSetAuthedUser } from '../actions/authedUser'
import { NavLink } from 'react-router-dom'
import { Navbar, Nav, Form, Button} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';


// Navbar component 
// Removed authedUser when 'sign out' is clicked
class NavBar extends Component {

handleSignOut = (e) => {
    const { dispatch } = this.props
    dispatch(handleSetAuthedUser(null))
    }

    render() {
        const { user } = this.props
       
        return (
            <Fragment>
                <Navbar bg="dark" variant="dark">
                    <Navbar.Brand>Would You Rather</Navbar.Brand>
                    <Nav className="mr-auto">
                        <NavLink to='/'  activeClassName='active' style={{marginRight:'10px'}}>Home</NavLink>
                        <NavLink to='/new'  activeClassName='active' style={{marginRight:'10px'}}> New Question </NavLink>
                        <NavLink to='/leaderboard'  activeClassName='active'>Leaderboard</NavLink>
                    </Nav>
                    <Form inline>
                        <Button variant="light" className='mr-3'>Welcome, {user}</Button>
                        <NavLink to='/' onClick={this.handleSignOut}><Button variant="outline-danger">Sign Out</Button></NavLink>
                    </Form>
                </Navbar>
            </Fragment>
        )
    }
}

function mapStateToProps({ users }, { loggedInID }){
    const user = users[loggedInID]
    return {
      user: user.name,
      
    }
  }

export default connect(mapStateToProps)(NavBar)