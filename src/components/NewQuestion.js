import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleAddQuestion } from '../actions/shared'
import { Button, Form, Container, Row, Col } from 'react-bootstrap'

// Form to create a new question and update store
// form inputs are saved to state
// on submit the stored inputs are dispatched to the store 
class NewQuestion extends Component {
    state = {
        inputOne: '',
        inputTwo: '',
    }

    // first question
    handleInputOne = (e) => {
        this.setState({
            inputOne: e.target.value
        })
    }
    // second question
    handleInputTwo = (e) => {
        this.setState({
            inputTwo: e.target.value
        })
    }
    // dispatches 2 options to store and returns to dashboard
    handleFormSubmit = (e) => {
        e.preventDefault()
        const { inputOne, inputTwo } = this.state
        const { dispatch, authedUser } = this.props
        dispatch(handleAddQuestion(inputOne, inputTwo, authedUser ))
        this.props.history.push('/')
    }

    render(){
        const { inputOne, inputTwo } = this.state

        return(
            <Container>
                <Row>
                    <Col>
                        <Form>
                            <h1>Create a new question</h1>
                            <h3>Would you rather...</h3>
                            <Form.Group controlId="option1">
                                <Form.Label>Option 1</Form.Label>
                                <Form.Control type="text" placeholder="Enter option one..." value={inputOne} onChange={this.handleInputOne} required />
                                <Form.Text className="text-muted">
                                Think of something funny.
                                </Form.Text>
                            </Form.Group>
                            <h3>Or...</h3>
                            <Form.Group controlId="option2">
                                <Form.Label>Option 2</Form.Label>
                                <Form.Control type="text" placeholder="Enter option two..." value={inputTwo} onChange={this.handleInputTwo} required />
                                <Form.Text className="text-muted">
                                Think of something funny.
                                </Form.Text>
                            </Form.Group>
                            <Button variant="primary" type="submit" onClick={this.handleFormSubmit}>
                                Save Question
                            </Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        )
    } 
}

export default connect()(NewQuestion)