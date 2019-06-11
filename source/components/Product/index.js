// Core
import React, { Component } from 'react';
import { format } from 'date-fns';

// Components
import Calendar from '../Calendar';
import Directions from '../Directions';
import Time from '../Time';

// Instruments
import { api } from '../../REST';

export default class Product extends Component {

    state = {
        dates:    this.props.dates,
        times:    [],
        cartItem: {
            selectDirection: this.props.selectDirection,
            selectDate:      this.props.selectDate,
            selectTimeKey:   '',
            selectTime:      '',
            productKey:      '',
            name:            '',
        },
    }

    componentDidMount () {
        this._getTime();

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
        });
    }

    _setProductDate = (direction) => {
        const { directionsAll } = this.props;
        const selectedDirection = directionsAll.filter((item) => {
            return (

                item._key === direction
            );
        });
        const dates = selectedDirection[0].dates;

        this.setState({ dates });
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
            directionsAll,
            name,
            productKey,
        } = this.props;

        const {
            dates,
            times,
            cartItem,
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
            </fieldset>
        );
    }
}
