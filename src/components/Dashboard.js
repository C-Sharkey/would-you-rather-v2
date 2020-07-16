import React, { Component } from 'react'
import { connect } from 'react-redux'
import Question from './Question'
import NavBar from './NavBar'

class Dashboard extends Component {
    render(){
        console.log(this.props)
        return(
            <div>
                <h1>Dashboard</h1>
                <div className='container'>
                    <ul>
                        {this.props.questionIds.map((id) => (
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
    return {
        questionIds: Object.keys(questions)
            .sort((a,b) => questions[b].timestamp - questions[a].timestamp),
        authedUser    
    }
}

export default connect(mapStateToProps)(Dashboard)