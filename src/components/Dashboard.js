import React, { Component } from 'react'
import { connect } from 'react-redux'
import Question from './Question'

class Dashboard extends Component {
    render(){
        console.log(this.props)
        const { questionCount, questionIds } = this.props
        return(
            <div>
                <h1>Dashboard</h1>
                <h2>Questions: {questionCount} </h2>
                <div className='container'>
                    <ul>
                        {questionIds.map((id) => (
                            <li key={id}>
                                <Question id={id} />
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        )
    }
}

function mapStateToProps ({ questions }, { authedUser }) {
    const questionCount = Object.keys(questions).length
    return {
        questionIds: Object.keys(questions)
            .sort((a,b) => questions[b].timestamp - questions[a].timestamp),
        authedUser,
        questionCount    
    }
}

export default connect(mapStateToProps)(Dashboard)