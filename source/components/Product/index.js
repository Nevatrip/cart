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

  const { dispatch, totalData } = useStoreon('totalData');

  const {
    productId,
    date,
    productKey,
    name,
    direction,
    directionTitle,
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
    direction,
    directionTitle,
    date,
    selectedTicket: {},
    event:          '',
    selectedTime:   '',
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
    const selectedDate = format(date, 'yyyy-MM-dd', new Date());
    const times = await api.product.getProductTime(productId, direction, selectedDate);

    state.times = times;

    const time = getActualTime(fromUnixTime(times[0].start));
    const formatTime = format(time, 'HH:mm', new Date());

    cartItem.selectedTime = formatTime;
    cartItem.event = times[0]._key;

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

  const _changeProductData = (selectedDirection) => {
    const currentDirection = state.directionsAll[selectedDirection];

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
    <fieldset className = { Styles.productFieldset } >
      <legend className = { Styles.productLegend } >{ name }</legend>
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
        <button className =  'btn btn_secondary' onClick = { _deleteProductCart } >× Удалить товар</button>
      </div>
    </fieldset>
  );
};
