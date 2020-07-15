import React from 'react'
import Question from './Question'

const QuestionList = (props) => {
    const { questions } = props
    return (
      <div>
        {questions.map((question) => (
            <Question key={question.id} id={question.id}/>
          ))}
        <br/>
      </div>
    )
  }
  
  export default QuestionList