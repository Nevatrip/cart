// Core
import React, { Component } from 'react';
import { format } from 'date-fns';

// Components
import Calendar from '../Calendar';
import Directions from '../Directions';
import Time from '../Time';
import Tickets from '../Tickets';

// Instruments
import { api } from '../../REST';

export default class Product extends Component {

    state = {
        dates:         this.props.dates,
        directionsAll: {},
        times:         [],
        cartItem:      {
            selectDirection: this.props.selectDirection,
            selectDate:      this.props.selectDate,
            selectTickets:   this.props.selectTickets,
            selectTimeKey:   '',
            selectTime:      '',
            productKey:      '',
            name:            '',
        },
    }

    componentDidMount () {
        this._getTime();
        this._convertObj();

    }
    
    _convertObj = () => {
        const { directionsAll } = this.props;

        const directionsObj = {};

        directionsAll.forEach((item) => {
            directionsObj[item._key] = item;
        });
        this.setState({ directionsAll: directionsObj });
    }

    _getTime = async () => {
        const { productId, productKey, _setTotalData, name } = this.props;
        const { cartItem } = this.state;

        const date =  format(cartItem.selectDate, 'yyyy-MM-dd', new Date());
        const time = await api.product.getProductTime(productId, cartItem.selectDirection, date);

        const selectTime = time[0].start;
        const selectTimeKey = time[0]._key;

        cartItem.selectTime = selectTime;
        cartItem.selectTimeKey = selectTimeKey;
        cartItem.productKey = productKey;
        cartItem.name = name;

        this.setState({ cartItem, times: time });

        _setTotalData(cartItem);
    }

    _selectedTime = (selectTimeKey) => {

        this.setState({ selectTimeKey });
    }

    _selectedDirection = (direction) => {
        const { cartItem } = this.state;

        cartItem.selectDirection = direction;
        this.setState({ cartItem }, () => {
            this._setProductDate(direction);
            this._setProductTickets(direction);
        });
    }

    _setProductDate = (direction) => {
        const { directionsAll } = this.state;

        const currentDirection = directionsAll[direction];

        this.setState({ dates: currentDirection.dates });
    }
    _setProductTickets = (direction) => {
        const { cartItem } = this.state;
        const { directionsAll } = this.state;

        const currentDirection = directionsAll[direction];

        cartItem.selectTickets = currentDirection.tickets;

        this.setState({ cartItem });

    }

    _selectedDate = (date) => {

        const { cartItem } = this.state;

        cartItem.selectDate = date;
        this.setState({ cartItem }, () => {
            this._getTime();
        });
    }

    render () {
        const {
            _updateCartItem,
            name,
        } = this.props;

        const {
            cartItem,
            dates,
            directionsAll,
            times,
        } = this.state;

        if (cartItem.selectTime === '') {
            return null;
        }

        return (
            <fieldset>
                <legend>
                    { name }
                </legend>
                <Calendar
                    _selectedDate = { this._selectedDate }
                    _updateCartItem = { _updateCartItem }
                    cartItem = { cartItem }
                    dates = { dates }
                />
                <br />
                {
                    directionsAll.length <= 1 ? // Проверка на количество направлений экскурсии //
                        null :
                        <Directions
                            _selectedDirection = { this._selectedDirection }
                            _updateCartItem = { _updateCartItem }
                            cartItem = { cartItem }
                            directionsAll = { directionsAll }
                        />
                }
                {
                    this.state.times &&
                    <Time
                        _selectedTime = { this._selectedTime }
                        _updateCartItem = { _updateCartItem }
                        cartItem = { cartItem }
                        timesAll = { times }
                    />
                }
                <Tickets
                    cartItem = { cartItem }
                />
            </fieldset>
        );
    }
}
