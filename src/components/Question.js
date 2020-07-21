import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Card, Button } from 'react-bootstrap'

// Question card for unAnswered questions on Dashboard
class Question extends Component {
    render (){
        const { question, user, id } = this.props
        return (
            <Card style={{ width: '22rem' }} className='mt-4'>
                <Card.Img variant="top" src={user.avatarURL} alt={user.name} />
                <Card.Body>
                <Card.Title>{user.name} asks would you rathar:</Card.Title>
                <Card.Text>Option 1: {question.optionOne.text}</Card.Text>
                <Card.Text>Or...</Card.Text>
                <Link to={`/questions/${id}`} ><Button variant="primary">View Question</Button></Link>
                </Card.Body>
            </Card>
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