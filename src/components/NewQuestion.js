import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleAddQuestion } from '../actions/shared'

class NewQuestion extends Component {
    state = {
        inputOne: '',
        inputTwo: '',
    }

    handleInputOne = (e) => {
        this.setState({
            inputOne: e.target.value
        })
    }
    handleInputTwo = (e) => {
        this.setState({
            inputTwo: e.target.value
        })
    }

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
            <div>
                <h1>Create a new question</h1>
                <form>
                    <p>Would you rather:</p>
                    <label htmlFor=''>Option 1</label>
                    <input 
                        type='text'
                        value={inputOne} 
                        onChange={this.handleInputOne}
                        required 
                    />
                    <p>Or...</p>
                    <label htmlFor=''>Option 2</label>
                    <input 
                        type='text' 
                        value={inputTwo} 
                        onChange={this.handleInputTwo}
                        required 
                    />
                    <button 
                        type='submit'
                        onClick={this.handleFormSubmit}
                    >
                        Save Question
                    </button>
                </form>
            </div>
        )
    } 
}

export default connect()(NewQuestion)