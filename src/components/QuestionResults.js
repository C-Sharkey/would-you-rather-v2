import React, { Component } from 'react'
import { connect } from 'react-redux'
import NotFound from './NotFound'
import { Card, Button, ProgressBar, Badge, Container, Row, Col }from 'react-bootstrap'
import { Link } from 'react-router-dom'

// Displays the QuestionResults comonent once an option is selected on the Questions card
// shows votes and percentage bar
// shows badge for users answer
class QuestionResults extends Component {
    
    render () {
        const { user, question, totalVotes, myAnswer, isInvalid } = this.props
        // Votes and rounded percentages for each option
        const optOneVotes = question.optionOne.votes.length 
        const optOnePerc = Math.round((optOneVotes/totalVotes)*100)
        const optTwoVotes = question.optionTwo.votes.length 
        const optTwoPerc = Math.round((optTwoVotes/totalVotes)*100)

      return (
          <Container>
              <Row>
                  <Col>
                    <h1>Question results</h1>
                    {
                        (isInvalid === false)
                        ? (
                            <Card style={{ width: '22rem' }} className='mt-4'>
                                <Card.Img variant="top" alt={user.avatarURL} src={user.avatarURL} />
                                <Card.Body>
                                    <Card.Title>{user.name} asks would you rather:</Card.Title>
                                    <Card.Text>
                                    <p>{question.optionOne.text}</p>
                                    <p>{myAnswer[0][1] === "optionOne"
                                    ? <Badge variant="info">Picked by you</Badge>
                                    : null }</p>
                                    <p><b>Votes:</b> {optOneVotes}</p>
                                    <ProgressBar now={optOnePerc} label={`${optOnePerc}%`} />
                                    <br />
                                    <br />
                                    <p>{question.optionTwo.text}</p>
                                    <p>{myAnswer[0][1] === "optionTwo"
                                    ? <Badge variant='info'>Picked by you </Badge>
                                    : null }</p>
                                    <p><b>Votes:</b> {optTwoVotes}</p>
                                    <ProgressBar now={optTwoPerc} label={`${optTwoPerc}%`}/>
                                    </Card.Text>
                                    <Link to='/' ><Button variant="primary">Home</Button></Link>
                                </Card.Body>
                            </Card>
                        ) : <NotFound />
                    }
                </Col>
              </Row>
          </Container>
      )
    }
}

function mapStateToProps ({ questions, users, authedUser }, props) {
    // Gets id from the url 
    const { id } = props.match.params
    const question = questions[id]
    
    // filters undefined questions
    if (typeof question === 'undefined') {
        return {
            isInvalid: true,
            user: '',
            question:''
        }
    }
    
    // Calc total votes
    const totalVotes = question.optionOne.votes.length + question.optionTwo.votes.length
    const myAnswers = users[authedUser].answers

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