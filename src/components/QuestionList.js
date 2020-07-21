import React, { Fragment } from 'react'
import Question from './Question'

// Maps and displays Question component
const QuestionList = (props) => {
    const { questions } = props
    return (
      <Fragment>
        {questions.map((question) => (
            <Question key={question.id} id={question.id}/>
          ))}
        <br/>
      </Fragment>
    )
  }
  
  export default QuestionList