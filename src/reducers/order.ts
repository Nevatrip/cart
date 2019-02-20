import { IOrder } from '../view/components/Order'

export interface orderState {
    orders?: IOrder[]
}

export const orderReducer = function (state: any = {orders: []}, action: any) {
    console.log(state)
    if (action.type === "SERVICE_UPDATE") {
        return Object.assign({}, state, {
            orders: [{
                title: action.payload.service.title.ru.name,
                date: action.payload.order.date,
                isOpenDate: false,
                isOpenTime: false,
                tickets: Object.values(action.payload.tickets)
            }]
        })
    }
    return state
}