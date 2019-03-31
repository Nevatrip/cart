import * as React from "react";
import { cn } from "@bem-react/classname";
import { connect } from 'react-redux';
import { ICompileTicket } from "../../";
import { ApplicationState } from "../../../../reducers/index"
import { getPlaces, getType } from '../../../../actions/choice';


export interface IChoiceProps {order: ICompileTicket}
export interface IPlacae {
    id: string;
    category: string;
    value: string;
    available: boolean;
}
export interface IChoiceState {
    date: string;
    event: string;
    place: string;
    places: IPlacae[],
    checked: any;
}

class ChoiceOfPlaceClass extends React.Component<IChoiceProps, IChoiceState> {
    constructor (props: IChoiceProps) {
        super(props)
        this.state = {
            date: '',
            event: '',
            place: '',
            places: [],
            checked: {}
        }
    }
    onCheck (id: string) {
        if (this.state.checked[id]) {
            this.setState({
                checked: {
                    ...this.state.checked,
                    [id]: false,
                }
            })
        } else {
            this.setState({
                checked: {
                    ...this.state.checked,
                    [id]: true,
                }
            })
        }
    }
    toTwoCharacterFormat (value: number) {
      if (value >= 10) {
        return String(value)
      } else {
        return `0${value}`
      }
    }

    dateToApiFormat (date: Date | undefined) {
      if (date) {
        return `${this.toTwoCharacterFormat(date.getDate())}.${this.toTwoCharacterFormat(date.getMonth() + 1)}.${String(date.getFullYear())}`
      } else {
        return ''
      }
    }

    getValuesForCategory (category: string) {
        if (this.props.order.tickets && this.state.places) {
            const tickets = this.props.order.tickets.filter(item => {
                return item.category.name.current === category
            })
            const required = tickets.reduce((acc, cur) => (acc + (cur.count || 0)), 0)
            const exist = Object.keys(this.state.checked).filter((item) => this.state.checked[item]).reduce((acc, cur) => {
                const {value} = this.state.places.find(item => (item.id === cur)) || {value: 0}
                return acc + (Number(value))
            }, 0)
            return (required - exist)
        } else {
            return 0
        }
    }

    updateData() {
        const order = this.props.order
        console.log(JSON.stringify(order))
        const {id, direction, date} = this.props.order
        if (order && id && direction && date) {
            getType(id, direction, this.dateToApiFormat(new Date(date)))
                .then(data => {
                    if (data && data[0] && data[0]._type) {
                        getPlaces(id, direction, this.dateToApiFormat(new Date(date)), data[0]._type)
                            .then(data => this.setState({
                                ...data,
                                id,
                                direction,
                                date,
                            }))
                        }
                    })
        }
    }

    componentDidMount () {
        this.updateData()
    }
    componentWillReceiveProps () {
        this.updateData()
    }
    render () {
        return (<div>
            {this.state.places.map((item) => {
                if (item.available) {
                    const requiredValue = this.getValuesForCategory(item.category)
                    if (Number(item.value) <= requiredValue || this.state.checked[item.id]) {
                        return (<div>
                            <input 
                                type="checkbox" 
                                checked={this.state.checked[item.id]}
                                onChange={() => this.onCheck(item.id)}/>
                            <label>i: {item.id} v: {item.value} c: {item.category}</label>
                        </div>)
                    } else {
                        return <div>i: {item.id} v: {item.value} c: {item.category}</div>
                    }
                } else {
                    return <div>недоступно i: {item.id} v: {item.value} c: {item.category}</div>
                }
            })}
        </div>)
    }
}

const mapStateToProps = (state: ApplicationState, props: {id: string}) => {
    const order = state.order.orders.find(item => (item.id === props.id)) || {id: props.id}
    return {
        order,
    }
}

export const ChoiceOfPlace = connect(mapStateToProps)(ChoiceOfPlaceClass)