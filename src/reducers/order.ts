import { ICompileTicket, IOneTicket } from '../view/components'

export interface orderState {
    orders: ICompileTicket[],
}

export const orderReducer = function (state: orderState = {orders: []}, action: any) {
    if (action.type === "SERVICE_UPDATE", action.payload) {
        return {
            orders: action.payload.orders,
        }
    }
    return state
}