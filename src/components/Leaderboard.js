import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Table, Image, Container, Row, Col } from 'react-bootstrap'

class Leaderboard extends Component {

    // Use bootstrap table to display details
    // sorted by total points highest to lowest

    render () {
        const { leaderboardData } = this.props

        return (
            <Container>
                <Row>
                    <Col>

                        <h1>Leaderboard</h1>

                        <Table responsive>
                            <thead>
                                <tr>
                                <th>Rank</th>
                                <th>Avatar</th>
                                <th>Name</th>
                                <th>Qu Asked</th>
                                <th>Qu Answered</th>
                                <th>Total Points</th>
                                </tr>
                            </thead>
                            <tbody>

                            {
                                leaderboardData.map((user, i) => (

                                    <tr key={user.ID}>
                                        <td>{i+1}</td>
                                        <td><Image alt={user.name} src={user.avatar} style={{ width: '3rem' }}/></td>
                                        <td>{user.name}</td>
                                        <td>{user.questionsAsked}</td>
                                        <td>{user.questionsAnswered}</td>
                                        <td>{user.points}</td>
                                    </tr>
                                ))
                            }
                            </tbody>
                        </Table>

                    </Col>
                </Row>
            </Container>
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