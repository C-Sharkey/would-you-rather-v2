import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'


class Question extends Component {
    render (){
        console.log(this.props)
        const { question, user, id } = this.props
        return (

            <div>
                <img src={user.avatarURL} alt={user.name} />
                <p>Name: {user.name}</p> 
                <p>Would you rather...</p>
                <p>Option 1: {question.optionOne.text}</p>
                <p>Or</p>
                <p>Option 2: {question.optionTwo.text}</p>
                
                    <button>View Question</button>
            </div>
        )
    }


}

function mapStatesToProps ({users, questions}, { id }) {
    const question = questions[id]
    const user = users[question.author]
    return {
      question,
      user
    }
}

export default connect(mapStatesToProps)(Question)