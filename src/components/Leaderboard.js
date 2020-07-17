import React, { Component } from 'react'
import { connect } from 'react-redux'

class Leaderboard extends Component {
    render () {
        const { leaderboardData } = this.props

        return (
            <div className='container'>
                <h1>Leaderboard</h1>
                <ul>
                {
                    leaderboardData.map((user) => (
                        <li key={user.ID}>
                            <p>{user.name}</p>
                            <img alt={user.name} src={user.avatar} />
                            <p>Total Points: {user.points} </p>
                            <p>Questions Asked: {user.questionsAsked} </p>
                            <p>Questions Answered: {user.questionsAnswered} </p>
                        </li>
                    ))
                }
                </ul>
            </div>
        )
    }
}

function mapStateToProps ({ questions, users }) {
    // Maps through users creating an array of needed data for leaderboard including points
    const leaderboardData = Object.keys(users).map((userID) => ({
        name: users[userID].name,
        ID: userID,
        avatar: users[userID].avatarURL,
        points: Object.keys(users[userID].answers).length + Object.keys(users[userID].questions).length,
        questionsAnswered: Object.keys(users[userID].answers).length,
        questionsAsked: Object.keys(users[userID].questions).length
    }))

    return {
        questions: Object.values(questions),
        // Sort points highest to lowest
        leaderboardData: leaderboardData.sort((a, b) => (b.questionsAnswered + b.questionsAsked) - (a.questionsAnswered + a.questionsAsked))
    }

}

export default connect(mapStateToProps)(Leaderboard)