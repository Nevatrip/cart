import { ICompileTicket, IOneTicket } from '../view/components'

export interface orderState {
    orders: ICompileTicket[]
}

export const orderReducer = function (state: orderState = {orders: []}, action: any) {
    if (action.type === "SERVICE_UPDATE") {
        if (Object.keys(action.payload.tickets).length && action.payload.order.date) {
            console.log('action.payload ' , action.payload)
            const tickets = Object.values(<IOneTicket[]> action.payload.tickets).filter((item: IOneTicket) => (item.count))
            let orders = state.orders.filter((item: ICompileTicket) => (item.title !== action.payload.service.title.ru.name))
            if (tickets.length) {
                orders = orders.concat({
                    title: action.payload.service.title.ru.name,
                    date: new Date(action.payload.order.date),
                    time: action.payload.order.time,
                    isOpenDate: false,
                    isOpenTime: false,
                    tickets,
                    direction: action.payload.order.direction,
                    id: action.payload.id,
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