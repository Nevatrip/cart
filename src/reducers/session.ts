export interface sessionState {
    sessionId: string
}

export const sessionReducer = function (state: sessionState = {sessionId: ''}, action: any) {
    if (action.type === "SET_SESSION_ID") {
        return {
            ...state,
            sessionId: action.payload
        }
    }
    return state
}