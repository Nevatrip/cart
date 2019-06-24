// Core
import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import fromUnixTime from 'date-fns/fromUnixTime';
import connect from 'storeon/react/connect';
import useStoreon from 'storeon/react';

// Components
import { Calendar } from '../Calendar';
import { Directions } from '../Directions';
import { Time } from '../Time';
import { Tickets } from '../Tickets';

// Instruments
import { api } from '../../REST';

export const Product = (props) => {

    const { dispatch, totalData } = useStoreon('totalData');

    const {
        productId,
        selectDate,
        productKey,
        name,
        selectDirection,
        selectDirectionTitle,
        indexItem,
        directionsAll,
        dates,
        tickets,
        _deleteProduct,
    } = props;

    // const currentItem = totalData[productKey];

    // if (currentItem === void 0) {
    //     return null;
    // }

    const initialState = {
        dates,
        tickets,
        directionsAll: {},
        times:         [],
    };

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

    const [state, _setState] = useState(initialState);

    const _convertObj = () => {

        const directionsObj = {};

        directionsAll.forEach((item) => {
            directionsObj[item._key] = item;
        });

        return (
            _setState({ directionsAll: directionsObj })
        );
    };

    const _getTime = async () => {

        const date =  format(selectDate, 'yyyy-MM-dd', new Date());
        const time = await api.product.getProductTime(productId, selectDirection, date);

        console.log('time', time);
        console.log('productId', productId);
        console.log('selectDirection', selectDirection);
        console.log('date', date);

        const selectTime = time[0].start;
        const selectTimeKey = time[0]._key;

        cartItem.selectTime = selectTime;
        cartItem.selectTimeKey = selectTimeKey;

        dispatch('totalData/get', cartItem);

        return (
            _setState({ times: time })
        );
    };

    useEffect(() => {
        _convertObj();
        _getTime();
    }, [directionsAll, selectDate, productId, selectDirection]);

    const _changeProductData = (direction) => {
        // const { directionsAll } = this.state;

        const currentDirection = state.directionsAll[direction];

        this._selectedDate(fromUnixTime(currentDirection.dates[0]));

        return (
            _setState({
                dates:   currentDirection.dates,
                tickets: currentDirection.tickets,
            })
        );
    };

    const _deleteProductCart = () => {
        // const { productKey, _deleteProduct } = this.props;

        console.log('productKey', productKey);
        _deleteProduct(productKey);
    };

    // console.log(state);

    return (
        <fieldset>
            <legend>{ name }</legend>
            {/* <Calendar
                dates = { state.dates }
                productKey = { productKey }
            />
            <br /> */}
            {
                Object.values(state.directionsAll).length <= 1 ? // Проверка на количество направлений экскурсии //
                    null :
                    <Directions
                        _changeProductData = { _changeProductData }
                        directionsAll = { state.directionsAll }
                        productKey = { productKey }
                    />
            }
            {/* {
                state.times.length === 0 ?
                    null :
                    <Time
                        // _selectedTime = { _selectedTime }
                        productKey = { productKey }
                        timesAll = { state.times }
                    />
            } */}
            {/* <Tickets
                productKey = { productKey }
                tickets = { state.tickets }
            /> */}
            <button onClick = { _deleteProductCart } >× Удалить товар</button>
        </fieldset>
    );

};
