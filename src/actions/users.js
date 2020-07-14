export const RECEIVE_USERS = 'RECEIVE_USERS'

export function receiveQuestions (users) {
    return {
        type: RECEIVE_USERS,
        users,
    }
}