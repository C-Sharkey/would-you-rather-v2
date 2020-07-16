import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleSetAuthedUser } from '../actions/authedUser'
import { NavLink } from 'react-router-dom'


class NavBar extends Component {

handleSignOut = (e) => {
    const { dispatch } = this.props
    dispatch(handleSetAuthedUser(null))
    }

    render() {
        const { user } = this.props
        console.log('Navbar loggedInUser : ', user)
       
        return (
            <div>
                <ul className='nav'>
                    <li>
                        <NavLink to='/'  activeClassName='active'>
                            Home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to='/new'  activeClassName='active'>
                        New Question
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to='/leaderboard'  activeClassName='active'>
                        Leaderboard
                        </NavLink>
                    </li>
                    <li>
                        Signed In: {user}
                    </li>
                    <li>
                        <NavLink to='/' onClick={this.handleSignOut}>
                        Sign Out
                        </NavLink>
                    </li>
                </ul>
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