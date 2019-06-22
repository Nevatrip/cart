// Core
import React, { Component } from 'react';
import { format } from 'date-fns';
import fromUnixTime from 'date-fns/fromUnixTime';
import connect from 'storeon/react/connect';
import { store } from '../../init/store';

// Components
import Calendar from '../Calendar';
import Directions from '../Directions';
import Time from '../Time';
import Tickets from '../Tickets';

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
        // this._initTimes();
        // this._initTotalData();

    }

    shouldComponentUpdate (nextProps, nextState) {
        if (this.state.dates !== nextState.dates ||
            this.state.tickets !== nextState.tickets ||
            this.state.times !== nextState.times ||
            this.state.directionsAll !== nextState.directionsAll ||
            this.state.cartItem !== nextState.cartItem ||
            this.props !== nextProps) {
            return true;
        }

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

    _initTimes = () => {
        const { dispatch, selectDate, selectDirection, productId } = this.props;

        const timeData = {
            selectDate,
            selectDirection,
            productId,
        };

        dispatch('times/get', timeData);
        // console.log('this.props.times', this.props.times);
        // console.log('store', dispatch('times/get', timeData));

        this._initTotalData();
    }

    _initTotalData = () => {

        console.log('this.props.times', this.props.times);
        const itemCart = {
            selectDirection:      this.props.selectDirection,
            selectDirectionTitle: this.props.selectDirectionTitle,
            selectDate:           this.props.selectDate,
            selectTicket:         {},
            selectTimeKey:        '',
            selectTime:           '',
            productKey:           '',
            name:                 '',
            indexItem:            this.props.indexItem,
        };
    }

    _getTime = async () => {
        const { productId, selectDate, productKey, _setTotalData, name, selectDirection } = this.props;

        const cartItem = {
            selectDirection,
            selectDirectionTitle: this.props.selectDirectionTitle,
            selectDate,
            selectTicket:         {},
            selectTimeKey:        '',
            selectTime:           '',
            productKey:           '',
            name:                 '',
            indexItem:            this.props.indexItem,
        };

        // const { dispatch } = this.props;
        // const { cartItem } = this.state;

        const date =  format(selectDate, 'yyyy-MM-dd', new Date());
        const time = await api.product.getProductTime(productId, selectDirection, date);

        console.log('time', time);

        const selectTime = time[0].start;
        const selectTimeKey = time[0]._key;

        cartItem.selectTime = selectTime;
        cartItem.selectTimeKey = selectTimeKey;
        cartItem.productKey = productKey;
        cartItem.name = name;

        this.setState({ cartItem, times: time }, () => {
            _setTotalData(cartItem);
        });

        // dispatch('times/addState', time);
        // dispatch('totalData/get', cartItem);

    }

    _selectedTime = (selectTimeKey, selectTime) => {

        const { cartItem } = this.state;
        const { dispatch, _updateCartItem } = this.props;

        cartItem.selectTime = selectTime;
        cartItem.selectTimeKey = selectTimeKey;
        // _updateCartItem(cartItem);
        dispatch('totalData/updateCartItem', cartItem);

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
        const { dispatch, _updateCartItem } = this.props;

        cartItem.selectDirection = direction;
        cartItem.selectDirectionTitle = titleDirection;
        this.setState({ cartItem }, () => {
            this._changeProductData(direction);
            // _updateCartItem(cartItem);

        });
        dispatch('totalData/updateCartItem', cartItem);

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
        const { dispatch, _updateCartItem } = this.props;

        cartItem.selectDate = date;
        // this.setState({ cartItem }, () => {
        //     this._getTime();
        //     // _updateCartItem(cartItem);
        // });
        this._getTime();

        dispatch('totalData/updateCartItem', cartItem);

    }

    _deleteProduct = () => {
        const { productKey, _deleteProduct } = this.props;

        console.log('productKey', productKey);
        // _deleteProduct(productKey);
    }

    render () {
        const { name, productKey } = this.props;
        // console.log('store', store.get());

        // console.log(this.props.totalData);
        const {
            cartItem,
            dates,
            directionsAll,
            times,
            tickets,
            cartItem: { selectDirection },
        } = this.state;

        // if (cartItem.selectTime === '') {
        //     return null;
        // }

        return (
            <fieldset>
                <legend>{ name }</legend>
                <Calendar
                    // _selectedDate = { this._selectedDate }
                    cartItem = { cartItem }
                    dates = { dates }
                    productKey = { productKey }
                />
                <br />
                {/* {
                    Object.values(directionsAll).length <= 1 ? // Проверка на количество направлений экскурсии //
                        null :
                        <Directions
                            _selectedDirection = { this._selectedDirection }
                            cartItem = { cartItem }
                            directionsAll = { directionsAll }
                            selectDirection = { selectDirection }
                        />
                } */}
                {/* {
                    this.state.times &&
                    <Time
                        _selectedTime = { this._selectedTime }
                        cartItem = { cartItem }
                        timesAll = { times }
                    />
                } */}
                {/* <Tickets
                    _selectedTicket = { this._selectedTicket }
                    tickets = { tickets }
                /> */}
                <button onClick = { this._deleteProduct } >× Удалить товар</button>
            </fieldset>
        );
    }
}
export default connect('cartItem', 'times', 'totalData', Product);
