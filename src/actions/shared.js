import { getInitialData, saveQuestion, saveQuestionAnswer } from '../utils/api'
import { receiveUsers } from '../actions/users'
import { receiveQuestions } from '../actions/questions'
import { setAuthedUser } from '../actions/authedUser'
import { saveAnswerForUser, addQuestionForUser } from '../actions/users'
import { saveAnswerForQuestion, addQuestionForQuestion } from '../actions/questions'


const AUTHED_ID = null

export function handleInitialData () {
    return (dispatch) => {
      return getInitialData()
        .then(({ users, questions }) => {
          dispatch(receiveUsers(users));
          dispatch(receiveQuestions(questions));
          dispatch(setAuthedUser(AUTHED_ID));
        });
    };
  }

  export function handleSaveAnswer ({ authedUser, qid, answer }) {
    console.log('SHARED::: ', authedUser, ' | ', qid, ' | ', answer)

    return (dispatch) => {
  
      dispatch(saveAnswerForQuestion({authedUser, qid, answer}))
      dispatch(saveAnswerForUser({authedUser, qid, answer}))
  
      return saveQuestionAnswer({authedUser, qid, answer})
      .catch((error) => {
        console.log('Error: ', error)
        dispatch(saveAnswerForQuestion({authedUser, qid, answer}))
      })
    }
  }

  export function handleAddQuestion (optOne, optTwo) {
    return (dispatch, getState) => {
      const { authedUser } = getState()

      return saveQuestion({ optionOneText: optOne, optionTwoText: optTwo, author: authedUser })
        .then(( question ) => {
          dispatch(addQuestionForQuestion(question));
          dispatch(addQuestionForUser(question));
        });
    };
  }