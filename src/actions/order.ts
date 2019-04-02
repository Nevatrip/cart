import { IServiceState, service } from '../view/components/Service/index';
import { store } from '../view'
import { ICompileTicket, IOneTicket, IResponce } from "../view/components"
import { func } from 'prop-types';
import { OrderAside } from '../view/components/Order/Aside/Order-Aside';

export const initialService = function (dispatch: Function, payload: IServiceState, sessionId: string) {
    const state = store.getState().order
    if (Object.keys(payload.tickets).length && payload.order.date) {
        const tickets = Object.values(<IOneTicket[]> payload.tickets).filter((item: IOneTicket) => (item.count))
        let orders = state.orders.filter((item: ICompileTicket) => {
            return !(item.id === payload.id)
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

function extractOrder (sessionId: string, serviceId: string, dispatch: Function, service: service, changeValue: Function) {
    const state = store.getState().order
    let order = {...state.orders.find((item: ICompileTicket) => item.id === serviceId)}
    const changedOrder = changeValue(order)
    changedOrder.tickets = filterTickets(changedOrder.tickets, service, changedOrder.direction)
    const orders = state.orders.map(item => (item.id === changedOrder.id ? changedOrder : item))
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

export function filterTickets(tickets: any, service: service, direction: string ) {
    const { directions } = service
    const selectedDirection = directions && directions.filter(item => item._key === direction)[0]
    return tickets.filter((item: any) => {
        if (selectedDirection) {
            return selectedDirection.tickets.find(elem => {
                return elem._key === item._key
            })
        } else {
            return false
        }
    })
}

export function checkTime(time: Date, newDate: Date, service: service, direction: string ) {
    const {
        directions,
    } = service

    const selectedDirection = directions && directions.filter(item => item._key === direction)[0]

    const dateInFormst = newDate && new Date(newDate)
    const times = time && dateInFormst && selectedDirection && selectedDirection.schedule
        .flatMap(event => event.actions.map(action => new Date(action.start)))
        .filter(item => {
            return item.getFullYear() === dateInFormst.getFullYear() 
            && item.getMonth() === dateInFormst.getMonth() 
            && item.getDate() === dateInFormst.getDate()
        })
    const timeRes = times && times.find(item => {
        return item.getHours() === time.getHours()
            && item.getMinutes() === time.getMinutes()
    })

    return timeRes || (times && times[0])
}

export const changeDate = function (dispatch: Function, date: any, sessionId: string, serviceId: string, service: service) {
    extractOrder(sessionId, serviceId, dispatch, service, (order: any) => {
        return {
            ...order,
            time: checkTime(new Date(order.time), new Date(date), service, order.direction),
            date: new Date(date),
        }
    })
}

export const changeDirection = function (dispatch: Function, direction: any, sessionId: string, serviceId: string, service: service) {
    extractOrder(sessionId, serviceId, dispatch, service, (order: any) => {
        return {
            ...order,
            time: checkTime(new Date(order.time), new Date(order.date), service, direction),
            direction,
        }
    })
}

export const changeTime = function (dispatch: Function, time: any, sessionId: string, serviceId: string, service: service) {
    extractOrder(sessionId, serviceId, dispatch, service, (order: any) => {
        return {
            ...order,
            time,
        }
    })

}

export const changeTickets = function (dispatch: Function, payload: any, sessionId: string, serviceId: string, service: service) {
    extractOrder(sessionId, serviceId, dispatch, service, (order: any) => {
        const tickets = Object.values(<IOneTicket[]> payload).filter((item: IOneTicket) => (item.count))
        return {
            ...order,
            tickets,
        }
    })

}

export const setService = function (dispatch: Function, orders: IServiceState) {
    dispatch({
        type: "SERVICE_UPDATE",
        payload: {
            orders,
        }
    })
}

export const getService = function (dispatch: Function, sessionId: string) {
    fetch(`http://api.nevatrip.ru/shoppingCarts/${sessionId}`,  {
        method: "GET",
        headers: {},
    })
        .then(response => {
            if (response.status === 200) {
                return response.json().then(data => (data && data.items) && setService(dispatch, data.items.map((item: IResponce) => (item.options || {}))))
            }
        })
}

