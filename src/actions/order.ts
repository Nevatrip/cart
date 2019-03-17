import { IServiceState } from '../view/components/Service/index';
import { store } from '../view/components/Page/Page'
import { ICompileTicket, IOneTicket, IResponce } from "../view/components"

export const updateService = function (dispatch: Function, payload: IServiceState, sessionId: string | null) {
    if (sessionId) {
        const state = store.getState().order
        const created = state.created;
        if (Object.keys(payload.tickets).length && payload.order.date) {
            const tickets = Object.values(<IOneTicket[]> payload.tickets).filter((item: IOneTicket) => (item.count))
            let orders = state.orders.filter((item: ICompileTicket) => {
                return !((item.id === payload.id) && (String(new Date(item.time || 0)) === String(new Date(payload.order.time || 0))) && (item.direction === payload.order.direction))
            })
            if (tickets.length && payload.service.title) {
                orders = orders.concat({
                    title: payload.service.title.ru.name,
                    date: new Date(payload.order.date),
                    time: payload.order.time,
                    isOpenDate: false,
                    isOpenTime: false,
                    tickets,
                    direction: payload.order.direction,
                    id: payload.id,
                })
            }
            dispatch({
                type: "SERVICE_UPDATE",
                payload: {
                    orders
                }
            })
            fetch(`http://api.nevatrip.ru/shoppingCarts/${sessionId}`,  {
                method: "PUT",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    sessionId,
                    created,
                    lastUpdated: new Date(),
                    items: orders.map(item => {
                        return {
                            "serviceId": item.id,
                            "options": item
                        }
                    })
                })
            })
        }
    }
}

export const setService = function (dispatch: Function, orders: IServiceState, created: Date) {
    dispatch({
        type: "SERVICE_UPDATE",
        payload: {
            orders,
            created
        }
    })
}

export const getService = function (dispatch: Function, sessionId: string | null) {
    if (sessionId) {
        fetch(`http://api.nevatrip.ru/shoppingCarts/${sessionId}`,  {
            method: "GET",
            headers: {},
        })
            .then(response => response.json().then(data => (data && data.items) && setService(dispatch, data.items.map((item: IResponce) => (item.options || {})), new Date(data.created))))
    }
}

