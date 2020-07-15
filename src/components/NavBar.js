import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleSetAuthedUser } from '../actions/authedUser'


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
                        Home
                    </li>
                    <li>
                        New Question
                    </li>
                    <li>
                        Leaderboard
                    </li>
                    <li>
                        Signed In: 
                    </li>
                    <li>
                        Sign Out
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