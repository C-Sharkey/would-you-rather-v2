import React, { Component } from 'react'
import { connect } from 'react-redux'
import { formatQuestion } from '../utils/helpers'

class Questions extends Component {
    render (){
        console.log(this.props)
        return (
            <div>
                Questions 
            </div>
        )
    }


}

function mapStatesToProps ({authedUser, users, questions}, { id }) {
    const question = questions[id]

    return {
        authedUser, 
        question: formatQuestion(question, users[question.author], authedUser)
    }
}

export default connect(mapStatesToProps)(Questions)