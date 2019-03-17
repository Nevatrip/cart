export interface sessionState {
    sessionId: string | null
}

export const sessionReducer = function (state: sessionState = {sessionId: null}, action: any) {
    if (action.type === "SET_SESSION_ID") {
        return {
            ...state,
            sessionId: action.payload
        }
    }
    return state
}