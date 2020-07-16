import { RECEIVE_QUESTIONS, ADD_QUESTION_ANSWER, ADD_QUESTION } from '../actions/questions'

export default function questions (state = {}, action) {
    switch(action.type) {
        case RECEIVE_QUESTIONS :
             return {
                 ...state,
                 ...action.questions
             }

        case ADD_QUESTION_ANSWER:
            const { authedUser, questionID, answer } = action.authedUser

            return {
                ...state, 
                [questionID]:{
                    ...state[questionID],
                    [answer]: {
                        ...state[questionID][answer],
                        votes: state[questionID][answer].votes.concat([authedUser])
                    }
                }
            }

            case ADD_QUESTION:
                const { question } = action
                return {
                    ...state,
                    [question.id]: question
                }

        default : 
            return state
    }
}