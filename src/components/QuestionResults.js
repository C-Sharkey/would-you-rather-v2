import React, { Component } from 'react'
import { connect } from 'react-redux'
import NotFound from './NotFound'
import { Card, Button, ProgressBar, Badge, Container, Row, Col }from 'react-bootstrap'
import { Link } from 'react-router-dom'

// Displays the QuestionResults comonent once an option is selected on the Questions card
// shows votes and percentage bar
// shows badge for users answer
class QuestionResults extends Component {
    state = {
        optionOneVotes:0,
        optionOnePercentage:0,
        optionTwoVotes:0,
        optionTwoPercentage:0,   
    }

    // updates state with selected option if not null
    handleSetVotes = () => {
        if(this.props.isInvalid === false) {
        // Votes and rounded percentages for each option
        const { question } = this.props
        const optOneVotes = question.optionOne.votes.length 
        const optOnePerc = Math.round((optOneVotes/this.props.totalVotes)*100)
        const optTwoVotes = question.optionTwo.votes.length 
        const optTwoPerc = Math.round((optTwoVotes/this.props.totalVotes)*100)
            this.setState({
                optionOneVotes:optOneVotes,
                optionOnePercentage:optOnePerc,
                optionTwoVotes:optTwoVotes,
                optionTwoPercentage:optTwoPerc,   
            })
        }
    }
    componentDidMount() {
        this.handleSetVotes()
    }    
    
    render () {
        const { user, question, myAnswer, isInvalid } = this.props
        const { optionOneVotes, optionOnePercentage, optionTwoVotes, optionTwoPercentage } = this.state
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
                                    <p><b>Votes:</b> {optionOneVotes}</p>
                                    <ProgressBar now={optionOnePercentage} label={`${optionOnePercentage}%`} />
                                    <br />
                                    <br />
                                    <p>{question.optionTwo.text}</p>
                                    <p>{myAnswer[0][1] === "optionTwo"
                                    ? <Badge variant='info'>Picked by you </Badge>
                                    : null }</p>
                                    <p><b>Votes:</b> {optionTwoVotes}</p>
                                    <ProgressBar now={optionTwoPercentage} label={`${optionTwoPercentage}%`}/>
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