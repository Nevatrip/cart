import { IOrder } from '../view/components/Order'

export interface orderState {
    orders?: IOrder[]
}

export const orderReducer = function (state: any = {orders: []}, action: any) {
    if (action.type === "SERVICE_UPDATE") {
        if (Object.keys(action.payload.tickets).length && action.payload.order.date) {
            const tickets = Object.values(action.payload.tickets).filter((item: any) => (item.count))
            const orders = state.orders.filter((item: any) => (item.title !== action.payload.service.title.ru.name)).concat([{
                title: action.payload.service.title.ru.name,
                date: new Date(action.payload.order.date),
                time: action.payload.order.time,
                isOpenDate: false,
                isOpenTime: false,
                tickets
            }])
            return {
                ...state,
                orders
            }
        }
    }
    return state
}