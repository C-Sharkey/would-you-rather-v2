import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleSetAuthedUser } from '../actions/authedUser'
import { NavLink } from 'react-router-dom'


class NavBar extends Component {

handleLogout = (e) => {
    const { dispatch } = this.props
    dispatch(handleSetAuthedUser(null))
    }
        
    render() {
        
       
        return (
            <div>
                <ul className='nav'>
                    <li>
                        <NavLink to='/dashboard'  activeClassName='active'>
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
                        Signed In: 
                    </li>
                    <li>
                        <NavLink to='/signOut'  activeClassName='active'>
                        Sign Out
                        </NavLink>
                    </li>
                </ul>
            </div>
        )
    }
}

function mapStateToProps({ users }, { authedUser }){
    const user = users[authedUser]
    return {
      user
    }
  }

export default connect(mapStateToProps)(NavBar)