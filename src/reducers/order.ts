import { IOrder, ITicket } from '../view/components/Order'

export interface orderState {
    orders: IOrder[]
}

export const orderReducer = function (state: orderState = {orders: []}, action: any) {
    if (action.type === "SERVICE_UPDATE") {
        if (Object.keys(action.payload.tickets).length && action.payload.order.date) {
            console.log(action.payload.tickets)
            const tickets = Object.values(<ITicket> action.payload.tickets).filter((item: ITicket) => (item.count))
            let orders = state.orders.filter((item: IOrder) => (item.title !== action.payload.service.title.ru.name))
            if (tickets.length) {
                orders = orders.concat({
                    title: action.payload.service.title.ru.name,
                    date: new Date(action.payload.order.date),
                    time: action.payload.order.time,
                    isOpenDate: false,
                    isOpenTime: false,
                    tickets
                })
            }
            return {
                ...state,
                orders
            }
        }
    }
    return state
}