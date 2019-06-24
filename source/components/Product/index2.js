// Core
import React, { Component } from 'react';
import { format } from 'date-fns';
import fromUnixTime from 'date-fns/fromUnixTime';
import connect from 'storeon/react/connect';

// Components
import { Calendar } from '../Calendar';
import { Directions } from '../Directions';
import { Time } from '../Time';
import { Tickets } from '../Tickets';

// Instruments
import { api } from '../../REST';

class Product extends Component {

    state = {
        dates:         this.props.dates,
        directionsAll: {},
        tickets:       this.props.tickets,
        times:         [],
        cartItem:      {
            selectDirection:      this.props.selectDirection,
            selectDirectionTitle: this.props.selectDirectionTitle,
            selectDate:           this.props.selectDate,
            selectTicket:         {},
            selectTimeKey:        '',
            selectTime:           '',
            productKey:           '',
            name:                 '',
            indexItem:            this.props.indexItem,
        },
    }

    componentDidMount () {

        this._getTime();
        this._convertObj();

    }

    // shouldComponentUpdate (nextProps, nextState) {
    //     if (this.state.dates !== nextState.dates ||
    //         this.state.tickets !== nextState.tickets ||
    //         this.state.times !== nextState.times ||
    //         this.state.directionsAll !== nextState.directionsAll ||
    //         this.state.cartItem !== nextState.cartItem ||
    //         this.props !== nextProps) {
    //         return true;
    //     }

    //     return false;
    // }

    _convertObj = () => {
        const { directionsAll } = this.props;

        const directionsObj = {};

        directionsAll.forEach((item) => {
            directionsObj[item._key] = item;
        });
        this.setState({ directionsAll: directionsObj });
    }

    _getTime = async () => {
        const {
            dispatch,
            productId,
            selectDate,
            productKey,
            name,
            selectDirection,
            selectDirectionTitle,
            indexItem,
        } = this.props;

        const cartItem = {
            selectDirection,
            selectDirectionTitle,
            selectDate,
            selectTicket:  {},
            selectTimeKey: '',
            selectTime:    '',
            productKey,
            name,
            indexItem,
        };

        const date =  format(selectDate, 'yyyy-MM-dd', new Date());
        const time = await api.product.getProductTime(productId, selectDirection, date);

        const selectTime = time[0].start;
        const selectTimeKey = time[0]._key;

        cartItem.selectTime = selectTime;
        cartItem.selectTimeKey = selectTimeKey;

        this.setState({ times: time });
        dispatch('totalData/get', cartItem);

    }

    _changeProductData = (direction) => {
        const { directionsAll } = this.state;

        const currentDirection = directionsAll[direction];

        this._selectedDate(fromUnixTime(currentDirection.dates[0]));

        this.setState({
            dates:   currentDirection.dates,
            tickets: currentDirection.tickets,
        });
    }

    _deleteProduct = () => {
        const { productKey, _deleteProduct } = this.props;

        console.log('productKey', productKey);
        _deleteProduct(productKey);
    }

    render () {
        const { name, productKey, totalData } = this.props;
        const currentItem = totalData[productKey];

        if (currentItem === void 0) {
            return null;
        }

        const {
            dates,
            directionsAll,
            times,
            tickets,
        } = this.state;

        return (
            <fieldset>
                <legend>{ name }</legend>
                <Calendar
                    dates = { dates }
                    productKey = { productKey }
                />
                <br />
                {
                    Object.values(directionsAll).length <= 1 ? // Проверка на количество направлений экскурсии //
                        null :
                        <Directions
                            _changeProductData = { this._changeProductData }
                            directionsAll = { directionsAll }
                            productKey = { productKey }
                        />
                }
                {
                    this.state.times.length === 0 ?
                        null :
                        <Time
                            _selectedTime = { this._selectedTime }
                            productKey = { productKey }
                            timesAll = { times }
                        />
                }
                <Tickets
                    productKey = { productKey }
                    tickets = { tickets }
                />
                <button onClick = { this._deleteProduct } >× Удалить товар</button>
            </fieldset>
        );
    }
}
export default connect('totalData', Product);
