import { ICompileTicket, IOneTicket } from '../view/components'

export interface orderState {
    orders: ICompileTicket[],
    created: Date
}

export const orderReducer = function (state: orderState = {orders: [], created: new Date()}, action: any) {
    if (action.type === "SERVICE_UPDATE", action.payload) {
        return {
            orders: action.payload.orders,
            created: action.payload.created || state.created
        }
    }
    return state
}