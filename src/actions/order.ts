import { IServiceState, service } from '../view/components/Service/index';
import { store } from '../view'
import { ICompileTicket, IOneTicket, IResponce } from "../view/components"

export const initialService = function ( newOrder: any, sessionId: string, serviceId: string, service: service) {
    extractOrder(sessionId, serviceId, service, (order: any) => {
        return {
            ...order,
            title: (service && service.title) ? service.title.ru.name : '',
            date: new Date(newOrder.date),
            time: newOrder.time,
            isOpenDate: false,
            isOpenTime: false,
            direction: newOrder.direction,
        }
    })
}

function extractOrder (sessionId: string, serviceId: string,  service: service, changeValue: Function) {
    const state = store.getState().order
    let order = {...state.orders.find((item: ICompileTicket) => item.id === serviceId)}
    const changedOrder = changeValue(order)
    changedOrder.tickets = filterTickets(changedOrder.tickets, service, changedOrder.direction)
    const orders = state.orders.map(item => (item.id === changedOrder.id ? changedOrder : item))
    store.dispatch({
        type: "SERVICE_UPDATE",
        payload: {
            orders
        }
    })
    fetch(`https://api.nevatrip.ru/shoppingCarts/${sessionId}`,  {
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
    console.log({direction})
    return tickets ? tickets.filter((item: any) => {
        if (selectedDirection) {
            return selectedDirection.tickets.find(elem => {
                return elem._key === item._key
            })
        } else {
            return false
        }
    }) : []
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

export const changeDate = function ( date: any, sessionId: string, serviceId: string, service: service) {
    extractOrder(sessionId, serviceId, service, (order: any) => {
        return {
            ...order,
            time: checkTime(new Date(order.time), new Date(date), service, order.direction),
            date: new Date(date),
        }
    })
}

export const changeDirection = function ( direction: any, sessionId: string, serviceId: string, service: service) {
    extractOrder(sessionId, serviceId, service, (order: any) => {
        return {
            ...order,
            time: checkTime(new Date(order.time), new Date(order.date), service, direction),
            direction,
        }
    })
}

export const changeTime = function ( time: any, sessionId: string, serviceId: string, service: service) {
    extractOrder(sessionId, serviceId, service, (order: any) => {
        return {
            ...order,
            time,
        }
    })

}

export const changeTickets = function ( payload: any, sessionId: string, serviceId: string, service: service) {
    console.log(service)
    extractOrder(sessionId, serviceId, service, (order: any) => {
        const tickets = Object.values(<IOneTicket[]> payload).filter((item: IOneTicket) => (item.count))
        return {
            ...order,
            tickets,
        }
    })

}

export const setService = function ( orders: IServiceState) {
    store.dispatch({
        type: "SERVICE_UPDATE",
        payload: {
            orders,
        }
    })
}

export const getService = function ( sessionId: string) {
    fetch(`https://api.nevatrip.ru/shoppingCarts/${sessionId}`,  {
        method: "GET",
        headers: {},
    })
        .then(response => {
            if (response.status === 200) {
                return response.json().then(data => (data && data.items) && setService(data.items.map((item: IResponce) => ({...item.options, id: item.serviceId} || {}))))
            }
        })
}

