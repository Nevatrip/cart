// Core
import React, { useState, useEffect } from 'react';
import { format, fromUnixTime } from 'date-fns';
import useStoreon from 'storeon/react';

// Components
import { Calendar } from '../Calendar';
import { Directions } from '../Directions';
import { Time } from '../Time';
import { Tickets } from '../Tickets';

// Instruments
import { api } from '../../REST';
import { getActualTime } from '../../instruments/helpers';
import Styles from './styles.m.css';

export const Product = (props) => {

  const { dispatch, totalData, cart } = useStoreon('totalData', 'cart');

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
  } = props;

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

    state.directionsAll = directionsObj;

    return (
      _setState(state)
    );
  };

  const _getTime = async () => {
    const date =  format(selectDate, 'yyyy-MM-dd', new Date());
    const times = await api.product.getProductTime(productId, selectDirection, date);

    state.times = times;

    const time = getActualTime(fromUnixTime(times[0].start));
    const formatTime = format(time, 'HH:mm', new Date());

    cartItem.selectTime = formatTime;
    cartItem.selectTimeKey = times[0]._key;

    totalData[cartItem.productKey] = cartItem;

    dispatch('totalData/get', totalData);

    return (
      _setState(state)
    );
  };

  useEffect(() => {
    _convertObj();
    _getTime();
  }, []);

  const _changeProductData = (direction) => {

    const currentDirection = state.directionsAll[direction];

    state.dates = currentDirection.dates;
    state.tickets = currentDirection.tickets;

    return (
      _setState(state)
    );
  };

  const _deleteProductCart = () => {
    dispatch('cart/delItem', productKey);
  };

  return (
    <fieldset>
      <legend>{ name }</legend>
      <div className = { Styles.productWrapper } >

        <Calendar
          dates = { state.dates }
          productKey = { productKey }
        />
        <br />
        {
          Object.values(state.directionsAll).length <= 1 ? // Проверка на количество направлений экскурсии //
            null :
            <Directions
              _changeProductData = { _changeProductData }
              directionsAll = { state.directionsAll }
              productKey = { productKey }
            />
        }
        {
          state.times.length === 0 ?
            null :
            <Time
              productKey = { productKey }
              timesAll = { state.times }
            />
        }
        <Tickets
          productKey = { productKey }
          tickets = { state.tickets }
        />
        <button onClick = { _deleteProductCart } >× Удалить товар</button>
      </div>
    </fieldset>
  );
};
