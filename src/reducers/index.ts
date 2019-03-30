import { combineReducers } from 'redux'

import { orderState, orderReducer } from './order'
import { sessionState, sessionReducer } from './session'

export interface ApplicationState {
  order: orderState,
  session: sessionState,
}

export const rootReducer = combineReducers<ApplicationState>({
  order: orderReducer,
  session: sessionReducer,
})