import React, { Component } from 'react'
import { connect } from 'react-redux'

class Questions extends Component {
    render (){
        console.log(this.props)
        const { question, user, id } = this.props
        return (

            <div>
                <img src={user.avatarURL} alt={user.name} />
                <p>Name: {user.name}</p> 
                <p>Option 1: {question.optionOne.text}</p>
                <p>Option 2: {question.optionTwo.text}</p>
                <button type='submit'>Vote</button>
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

export default connect(mapStatesToProps)(Questions)