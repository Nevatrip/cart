// Core
import React, { useState, useEffect, useMemo } from 'react';
import { format } from 'date-fns';
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
    const time = await api.product.getProductTime(productId, selectDirection, date);

    state.times = time;

    const selectTime = time[0].start;
    const selectTimeKey = time[0]._key;

    cartItem.selectTime = selectTime;
    cartItem.selectTimeKey = selectTimeKey;

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
    // const { productKey, _deleteProduct } = this.props;

    console.log('productKey', productKey);
    _deleteProduct(productKey);
  };

  return (
    <fieldset>
      <legend>{ name }</legend>
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
    </fieldset>
  );
};
