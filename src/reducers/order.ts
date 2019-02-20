import { IOrder } from '../view/components/Order'

export interface orderState {
    orders?: IOrder[]
}

export const orderReducer = function (state: any, action: any) {
    console.log(action)
    return {}
}