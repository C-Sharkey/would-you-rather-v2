import React, { Component } from 'react'
import { connect } from 'react-redux'
import QuestionDetails from './Question'
import QuestionsResultsList from './QuestionsResultsList'
// React tabs for tab functionality 
// referenced this tutorial: https://www.youtube.com/watch?v=tBaBl7gpYhs
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import 'react-tabs/style/react-tabs.css';


class Dashboard extends Component {
    state = {
        tabSelectedItem: 'unAnsweredQuestions'
    }
    render(){
        const { questionCount, questionsAnswered, questionsUnanswered } = this.props
        const unAnsQuCount = questionsUnanswered.length
        const AnsQuCount = questionsAnswered.length

        const ansQu = questionsAnswered.map((answer) => (
            <li key={answer.id} >
                <QuestionsResultsList id={answer.id} />
            </li>
            )) 
        const unAnsQu = questionsUnanswered.map((answer) => (
            <li key={answer.id} >
                <QuestionDetails id={answer.id} />
            </li>
            ))             
         
        return(
            <div>
                <h1>Dashboard</h1>
                <h2>Total Questions: {questionCount} </h2>

                <Tabs 
                    selected={this.state.tabSelectedItem} 
                    onChange={tabSelectedItem => this.setState({ tabSelectedItem })}
                >
                    <TabList>
                        <Tab item="unAnsweredQuestions">Unanswered Questions ({unAnsQuCount})</Tab>
                        <Tab item="AnsweredQuestions">Answered Questions ({AnsQuCount})</Tab>
                    </TabList>
                    <TabPanel item="unAnsweredQuestions">
                        <div className='container'>
                            <ul>
                                {unAnsQu}
                            </ul>
                        </div>
                    </TabPanel>
                    <TabPanel item="AnsweredQuestions">
                        <div className='container'>
                            <ul>
                                {ansQu}
                            </ul>
                        </div>
                    </TabPanel>
                </Tabs>
            </div>
        )
    }
}

function mapStateToProps ({ users, questions, authedUser }) {

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