import React, { Component } from 'react'
import { connect } from 'react-redux'

class QuestionResultsList extends Component {
  render () {
    const { user, question, totalVotes, myAnswer } = this.props

    return (
      <div>
        <h1> Question Results List </h1>
        <h2>Results by {user.name} </h2>
        <img className="poll-card-avatar" alt={user.avatarURL} src={user.avatarURL} />
        <p>Would You Rather...</p>
        <p> 
          {question.optionOne.text}
          {myAnswer[0][1] === "optionOne" ? <span>Picked by you</span> : null } 
        </p>
        <p>{`${question.optionOne.votes.length} / ${totalVotes} votes`}</p>
        <br />
        <p>{question.optionTwo.text}</p>
        <p>{myAnswer[0][1] === "optionTwo" ? <span>Picked by you</span> : null }
          {`${question.optionTwo.votes.length} / ${totalVotes} votes`}</p>
             
      </div>
    )
  }
}

function mapStateToProps ({questions, users, authedUser}, props) {

  const { id } = props
  const question = questions[id]
  const totalVotes = question.optionOne.votes.length + question.optionTwo.votes.length
  const myAnswers = users[authedUser].answers

  return {
    questionID: id,
    question,
    user: users[question.author],
    myAnswer: Object.entries(myAnswers).filter((answer) => {
      return answer[0] === id
    }),
    totalVotes
  }

}

export default connect(mapStateToProps)(QuestionResultsList)