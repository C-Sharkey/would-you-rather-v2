import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleSetAuthedUser } from '../actions/authedUser'
import { NavLink } from 'react-router-dom'
import { Navbar, Nav, Form, Badge, Button} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';



class NavBar extends Component {

handleSignOut = (e) => {
    const { dispatch } = this.props
    dispatch(handleSetAuthedUser(null))
    }

    render() {
        const { user } = this.props
       
        return (
            <div>

            <Navbar bg="dark" variant="dark">
                <Navbar.Brand>Would You Rather</Navbar.Brand>
                <Nav className="mr-auto">
                    <Nav.Link><NavLink to='/'  activeClassName='active'>Home</NavLink></Nav.Link>
                    <Nav.Link><NavLink to='/new'  activeClassName='active'> New Question </NavLink></Nav.Link>
                    <Nav.Link><NavLink to='/leaderboard'  activeClassName='active'>Leaderboard</NavLink></Nav.Link>
                </Nav>
                <Form inline>
                    <Button variant="light" className='mr-3'>Welcome, {user}</Button>
                    <NavLink to='/' onClick={this.handleSignOut}><Button variant="outline-info">Sign Out</Button></NavLink>
                </Form>
            </Navbar>

            </div>
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