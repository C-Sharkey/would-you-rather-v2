import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { handleSaveAnswer } from '../actions/shared'
import NotFound from '../components/NotFound'


class QuestionDetails extends Component{
    state = {
        option: ''   
    }

    handleChange = (e) => {
        this.setState({
            option: e.target.value
        })
    }

    handleSelection = () => {
        const { dispatch, authedUser, questionID} = this.props
        const answer = this.state.option
        const qid = questionID
        dispatch(handleSaveAnswer({authedUser, qid, answer})) 
    }

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
            <div>
                <h1>Question Details</h1>

                {
                    (isInvalid === false)
                    ? (
                        <div>
                            <p>{user.name} asks:</p>
                            <img alt={user.name} src={user.avatarURL} />
                            <p>Would you rather...</p>
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
                            <Link to={`/results/${questionID}`} >
                                <button onClick={this.handleSelection}>Submit</button>
                            </Link>
                        </div>
                    ) : <NotFound />
                }
            </div>
        )
    }
}

function mapStateToProps ({questions, users, authedUser}, props) {
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