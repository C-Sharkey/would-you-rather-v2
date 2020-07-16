import { RECEIVE_USERS, ADD_ANSWER_USER, ADD_QUESTION_USER } from '../actions/users'

export default function users (state = {}, action) {
    switch(action.type) {
        case RECEIVE_USERS :
             return {
                 ...state,
                 ...action.users
             }
        case ADD_ANSWER_USER:
            const { authedUser, questionID, answer} = action.authedUser

            return {
                ...state, 
                [authedUser]: {
                    ...state[authedUser],
                    answers: {
                        ...state[authedUser].answers,
                        [questionID]: answer
                    }
                }
            }

        case ADD_QUESTION_USER:
            const { question } = action
            return {
                ...state,
                [question.author]: {
                    ...state[question.author],
                    question: state[question.author].questions.concat([question.id])
                }
            }

        default : 
            return state
    }
}