import React, { Component } from 'react'
import { connect } from 'react-redux'
import NotFound from './NotFound'


class QuestionResults extends Component {
    render () {
        const { user, question, totalVotes, myAnswer, isInvalid } = this.props
        console.log('ZZZZZZ ', myAnswer)
      return (
          <div>

              <h1>Question results</h1>

              {
                  (isInvalid === false)
                  ? (
                      <div>
                          <p>Results from {user.name}</p>
                          <img alt={user.avatarURL} src={user.avatarURL} />
                          <p>Would you rather...</p>
                          <p>{question.optionOne.text}</p>
                          {console.log('MYANS::: ', myAnswer)}
                          <p>{myAnswer[0][1] === "optionOne"
                            ? <span>Picked by you</span>
                            : null }</p>
                            <p>Votes: {question.optionOne.votes.length / totalVotes}</p>
                            <p>Percentage: {(question.optionOne.votes.length/totalVotes)*100} </p>
                            <br />
                            <br />
                            <p>{question.optionTwo.text}</p>
                          <p>{myAnswer[0][1] === "optionTwo"
                            ? <span>Picked by you</span>
                            : null }</p>
                            <p>Votes: {question.optionTwo.votes.length / totalVotes}</p>
                            <p>Percentage: {(question.optionTwo.votes.length/totalVotes)*100} </p> 

                      </div>
                  ) : <NotFound />
              }
          </div>
      )
    }
}

function mapStateToProps ({ questions, users, authedUser }, props) {
    const { id } = props.match.params
    const question = questions[id]
    
    if (typeof question === 'undefined') {
        return {
            isInvalid: true,
            user: '',
            question:''
        }
    }
    
    const totalVotes = question.optionOne.votes.length + question.optionTwo.votes.length
    const myAnswers = users[authedUser].answers
    console.log('BRIAN::: ', myAnswers)
    console.log('TRY-1:: ',Object.entries(myAnswers))

    console.log('TRY-2:: ',Object.entries(myAnswers).filter((answer) => {return answer[0]}))
    return {
        questionID: id,
        question,
        user: users[question.author],
        myAnswer: Object.entries(myAnswers).filter((answer) => {
            return answer[0] === id
        }),
        totalVotes,
        isInvalid: false
    }
}

export default connect(mapStateToProps)(QuestionResults)