import { IOrder } from '../view/components/Order'

export interface orderState {
    orders?: IOrder[]
}

export const orderReducer = function (state: any = {orders: []}, action: any) {
    if (action.type === "SERVICE_UPDATE") {
        if (Object.keys(action.payload.tickets).length) {
            return Object.assign({}, state, {
                orders: state.orders.concat([{
                    title: action.payload.service.title.ru.name,
                    date: new Date(action.payload.order.date),
                    isOpenDate: false,
                    isOpenTime: false,
                    tickets: Object.values(action.payload.tickets)
                }])
            })
        }
    }
    return state
}