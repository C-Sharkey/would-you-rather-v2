import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Card, Badge, ProgressBar } from 'react-bootstrap'

// Displays question results card on dashboard under tab
class QuestionResultsList extends Component {
  render () {
    const { user, question, totalVotes, myAnswer } = this.props
    // Option votes with rounded percentage
    const optOneVotes = question.optionOne.votes.length 
    const optOnePerc = Math.round((optOneVotes/totalVotes)*100)
    const optTwoVotes = question.optionTwo.votes.length 
    const optTwoPerc = Math.round((optTwoVotes/totalVotes)*100)

    return (

          <Card style={{ width: '22rem' }} className='mt-4'>
            <Card.Img variant="top" alt={user.avatarURL} src={user.avatarURL} />
            <Card.Body>
                <Card.Title>{user.name} asks would you rather:</Card.Title>
                <Card.Text>
                  <p>{question.optionOne.text}</p>
                  <p>{myAnswer[0][1] === "optionOne"
                  ? <Badge variant="info">Picked by you</Badge>
                  : null }</p>
                  <p>Votes: {optOneVotes}</p>
                  <ProgressBar now={optOnePerc} label={`${optOnePerc}%`} />
                  <br />
                  <br />
                  <p>{question.optionTwo.text}</p>
                  <p>{myAnswer[0][1] === "optionTwo"
                  ? <Badge variant="info">Picked by you</Badge>
                  : null }</p>
                  <p>Votes: {optTwoVotes}</p>
                  <ProgressBar now={optTwoPerc} label={`${optTwoPerc}%`} />
                </Card.Text>
            </Card.Body>
            </Card>
    )
  }
}

function mapStateToProps ({questions, users, authedUser}, props) {
  // gets data for card from store
  const { id } = props
  const question = questions[id]
  const totalVotes = question.optionOne.votes.length + question.optionTwo.votes.length
  const myAnswers = users[authedUser].answers

  // returns the option the user selected as 'myAnswer'
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