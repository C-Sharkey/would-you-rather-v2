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
        console.log('STATE:: ', this.state)
        console.log('STATE:: ', e.target.value)
        this.setState({
            option: e.target.value
        })
        console.log('STATE:: ', this.state)
    }

    handleSelection = () => {
        const { dispatch, authedUser, questionID} = this.props
        const answer = this.state.option
        const qid = questionID
        console.log('!!!!!Dispatch____ ', authedUser, ' | ', qid, ' | ', answer)
        dispatch(handleSaveAnswer({authedUser, qid, answer})) 
    }

    handleSetSelection = () => {
        const { myAnswer } = this.props
        console.log('EDDY An:: ', myAnswer)
        console.log('EDDY op!!!:: ', this.state)

        if(myAnswer !== null) {
            this.setState({
                option: myAnswer
            })
        }
        console.log('EDDY op!!!!!:: ', this.state)

    }

    componentDidMount() {
        this.handleSetSelection()
    }

    render(){
        const { option } = this.state
        const { user, question, isInvalid, questionID } = this.props
        console.log('Q-ID ',questionID)

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
    console.log('EDDY myANS:: ',myAnswer)
    console.log('EDDY myANS:: ',users[authedUser])
    console.log('EDDY myANS:: ',users[authedUser].answers)


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