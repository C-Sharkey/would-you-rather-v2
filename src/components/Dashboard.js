import React, { Component } from 'react'
import { connect } from 'react-redux'
import QuestionDetails from './Question'
import QuestionsResultsList from './QuestionsResultsList'
import { Container, Col, Row, Badge } from 'react-bootstrap'
// React tabs for tab functionality 
// referenced this tutorial: https://www.youtube.com/watch?v=tBaBl7gpYhs
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import 'react-tabs/style/react-tabs.css';

// state store tab selected
// Added question count to show how many questions are in each list

class Dashboard extends Component {
    state = {
        tabSelectedItem: 'unAnsweredQuestions'
    }
    render(){
        const { questionCount, questionsAnswered, questionsUnanswered } = this.props
        const unAnsQuCount = questionsUnanswered.length
        const AnsQuCount = questionsAnswered.length

        const ansQu = questionsAnswered.map((answer) => (
                <QuestionsResultsList key={answer.id} id={answer.id} />
            )) 
        const unAnsQu = questionsUnanswered.map((answer) => (
                <QuestionDetails key={answer.id} id={answer.id} />
            ))             
         
        return(
            <Container>
                <Row>
                    <Col>
                        <h1>Dashboard</h1>
                        <h2>Total Questions <Badge variant='secondary'> {questionCount} </Badge></h2>

                        <Tabs 
                            selected={this.state.tabSelectedItem} 
                            onChange={tabSelectedItem => this.setState({ tabSelectedItem })}
                        >
                            <TabList>
                                <Tab item="unAnsweredQuestions">
                                    Unanswered Questions 
                                        <Badge variant='info'> {unAnsQuCount}</Badge>
                                </Tab>
                                <Tab item="AnsweredQuestions">
                                    Answered Questions 
                                        <Badge variant='secondary'>{AnsQuCount}</Badge>
                                </Tab>
                            </TabList>
                            <TabPanel item="unAnsweredQuestions">
                                {unAnsQu}
                            </TabPanel>
                            <TabPanel item="AnsweredQuestions">
                                {ansQu}
                            </TabPanel>
                        </Tabs>
                    </Col>
                </Row>
            </Container>
        )
    }
}

function mapStateToProps ({ users, questions, authedUser }) {
    // Get data from redux store 
    // sort questions newest to oldest
    // return answered and unanswer Qus


    const questionCount = Object.keys(questions).length
    const myAnswers = users[authedUser].answers
    const getQuAns = Object.values(questions).filter((question) => {
        return Object.keys(myAnswers).includes(question.id)
      }).sort((a, b) => b.timestamp - a.timestamp)
    const getQuUnAns = Object.values(questions).filter((question) => {
        return !(Object.keys(myAnswers).includes(question.id))
      }).sort((a, b) => b.timestamp - a.timestamp) 

    return {
        questionIds: Object.keys(questions)
            .sort((a,b) => questions[b].timestamp - questions[a].timestamp),
        authedUser,
        questionCount,
        questionsAnswered: getQuAns, 
        questionsUnanswered: getQuUnAns,    
    }
}

export default connect(mapStateToProps)(Dashboard)