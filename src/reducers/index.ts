import { combineReducers } from 'redux'

import { orderState, orderReducer } from './order'

export interface ApplicationState {
  order: orderState
}

export const rootReducer = combineReducers<ApplicationState>({
  order: orderReducer,
})