import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { handleSaveAnswer } from '../actions/shared'
import NotFound from '../components/NotFound'
import { Card, Button, Container, Col, Row } from 'react-bootstrap'

// Question card details with radio buttons to select an option
class QuestionDetails extends Component{
    state = {
        option: ''   
    }
    // selected option saved in state

    // updates state when option is selected
    handleChange = (e) => {
        this.setState({
            option: e.target.value
        })
    }

    // on submit the selection is dispatched to store
    handleSelection = () => {
        const { dispatch, authedUser, questionID} = this.props
        const answer = this.state.option
        const qid = questionID
        dispatch(handleSaveAnswer({authedUser, qid, answer})) 
    }

    // updates state with selected option if not null
    handleSetSelection = () => {
        const { myAnswer } = this.props
        if(myAnswer !== null) {
            this.setState({
                option: myAnswer
            })
        }
    }

    componentDidMount() {
        this.handleSetSelection()
    }

    render(){
        const { option } = this.state
        const { user, question, isInvalid, questionID } = this.props

        return(
            <Container>
                <Row>
                    <Col>
                        <h1>Question Details</h1>

                        {
                            (isInvalid === false)
                            ? (

                                <Card style={{ width: '22rem' }} className='mt-4'>
                                    <Card.Img variant="top" alt={user.name} src={user.avatarURL}  />
                                    <Card.Body>
                                        <Card.Title>{user.name} asks would you rather...</Card.Title>
                                        <Card.Text>
                                            <form>
                                                <input 
                                                    id={question.optionOne.text}
                                                    type='radio'
                                                    checked={option === 'optionOne'}    
                                                    name='options'
                                                    value='optionOne'
                                                    onChange={this.handleChange}
                                                />
                                                <label htmlFor={question.optionOne.text}>{question.optionOne.text}</label>    
                                                <br />
                                                <br />
                                                <input 
                                                    id={question.optionTwo.text}
                                                    type='radio'
                                                    checked={option === 'optionTwo'}    
                                                    name='options'
                                                    value='optionTwo'
                                                    onChange={this.handleChange}
                                                />
                                                <label htmlFor={question.optionTwo.text}>{question.optionTwo.text}</label>    
                                            </form>                                
                                        </Card.Text>
                                        <Link to={`/results/${questionID}`} ><Button variant="primary" onClick={this.handleSelection}>Submit</Button></Link>
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

function mapStateToProps ({questions, users, authedUser}, props) {

    // Gets data from store
    // filters undefined questions

    const { id } = props.match.params
    const question = questions[id]

    if (typeof question === 'undefined') {
        return {
            isInvalid: true,
            user: '',
            question: ''
        }
    }

    const myAnswer = users[authedUser].answers[id]

    return {
        questionID: id,
        question,
        user: users[question.author],
        authedUser, 
        myAnswer,
        isInvalid: false
    }
}

export default connect(mapStateToProps)(QuestionDetails)