import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleSetAuthedUser } from '../actions/authedUser'


class Login extends Component {
    render(){
        return (
            <div>
                Login Page
            </div>
        )
    }
}

export default connect()(Login)
