import React, { Component } from 'react'
import { connect } from 'react-redux'

class QuestionResults extends Component {
    render () {
      return (
          <div>
              Question results
          </div>
      )
    }
}

export default connect(QuestionResults)