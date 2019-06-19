// Core
import React, { Component } from 'react';
import { format } from 'date-fns';
import fromUnixTime from 'date-fns/fromUnixTime';

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
    shouldComponentUpdate (nextProps, nextState) {

        if (this.state.dates !== nextState.dates) {

            return true;
        }
        if (this.state.tickets !== nextState.tickets) {

            return true;
        }

        if (this.state.times !== nextState.times) {

            return true;
        }
        if (this.state.directionsAll !== nextState.directionsAll) {
            return true;
        }
        if (this.state.cartItem !== nextState.cartItem) {
            return true;
        }
        if (this.props !== nextProps) {

            return true;
        }

        // console.log('this.state', this.state);

        return false;
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

        this.setState({ cartItem, times: time }, () => {
            _setTotalData(cartItem);
        });

    }

    _selectedTime = (selectTimeKey, selectTime) => {

        const { cartItem } = this.state;
        const { _updateCartItem } = this.props;

        cartItem.selectTime = selectTime;
        cartItem.selectTimeKey = selectTimeKey;
        _updateCartItem(cartItem);

    }

    _selectedTicket = (ticket) => {
        const { cartItem } = this.state;
        const { _updateCartItem } = this.props;
        const ticketKey = Object.keys(ticket)[0];

        cartItem.selectTicket[ticketKey] = ticket[ticketKey];
        this.setState({ cartItem }, () => {
            _updateCartItem(cartItem);
        });
    }

    _selectedDirection = (direction, titleDirection) => {
        const { cartItem } = this.state;
        const { _updateCartItem } = this.props;

        cartItem.selectDirection = direction;
        cartItem.selectDirectionTitle = titleDirection;
        this.setState({ cartItem }, () => {
            this._changeProductData(direction);
            _updateCartItem(cartItem);

        });
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

    _selectedDate = (date) => {
        const { cartItem } = this.state;
        const { _updateCartItem } = this.props;

        cartItem.selectDate = date;
        this.setState({ cartItem }, () => {
            this._getTime();
            _updateCartItem(cartItem);
        });
    }

    _deleteProduct = () => {
        const { productKey, _deleteProduct } = this.props;

        _deleteProduct(productKey);
    }

    render () {
        const { name } = this.props;

        const {
            cartItem,
            dates,
            directionsAll,
            times,
            tickets,
        } = this.state;

        if (cartItem.selectTime === '') {
            return null;
        }

        return (
            <fieldset>
                <legend>{ name }</legend>
                <Calendar
                    _selectedDate = { this._selectedDate }
                    cartItem = { cartItem }
                    dates = { dates }
                />
                <br />
                {
                    directionsAll.length <= 1 ? // Проверка на количество направлений экскурсии //
                        null :
                        <Directions
                            _selectedDirection = { this._selectedDirection }
                            cartItem = { cartItem }
                            directionsAll = { directionsAll }
                        />
                }
                {
                    this.state.times &&
                    <Time
                        _selectedTime = { this._selectedTime }
                        cartItem = { cartItem }
                        timesAll = { times }
                    />
                }
                <Tickets
                    _selectedTicket = { this._selectedTicket }
                    tickets = { tickets }
                />
                <button onClick = { this._deleteProduct } >× Удалить товар</button>
            </fieldset>
        );
    }
}
