// Core
import React, { useEffect } from 'react';
import fromUnixTime from 'date-fns/fromUnixTime';
import useStoreon from 'storeon/react';

// Components
import { Product } from '../../components/Product';
import { ProductPreview } from '../../components/ProductPreview';

// Instruments
import { api } from '../../REST';
import Styles from './styles.m.css';

export const Cart = (props) => {
  const { dispatch, user, cart, totalData } = useStoreon('user', 'cart', 'totalData', 'session');
  const { sessionId } = props;
  const { fullName, email, phone } = user;

  useEffect(() => {
    dispatch('session/id', sessionId);
    dispatch('cart/get');
  }, []);

  const _setUserData = (event) => {
    user[event.target.name] = event.target.value;

    dispatch('user/change', user);
  };

  const _checkOut = async () => {
    const order = {
      sessionId,
      user,
      totalData,
    };

    // const response = await api.order.newOrder(order);

    console.log('order', order);

    // if ((((response || {}).payment || {}).Model || {}).Url) {
    //   // window.location.href = response.payment.Model.Url;
    // }
  };

  const _renderProduct = () => {
    const result = cart.length
      ? cart.map(({ _id, key, title, directions, options }, index) => {
        const direction =
            (directions.find((dir) => dir._key === (options || {}).direction) ||
            directions)[0];

        return (
          <li key = { key }>
            <Product
              dates = { direction.dates }
              directionsAll = { directions }
              indexItem = { index }
              name = { title.ru.name }
              productId = { _id }
              productKey = { key }
              selectDate = { fromUnixTime(
                options && options.date > direction.dates[0]
                  ? options.date
                  : direction.dates[0]
              ) }
              selectDirection = { direction._key }
              selectDirectionTitle = { direction.title }
              tickets = { direction.tickets }
            />
          </li>
        );
      })
      : 'Корзина пуста';

    return result;
  };

  const _renderProductPreview = () => {
    const resultArray = Object.values(totalData).sort((a, b) =>
      a.indexItem > b.indexItem ? 1 : -1
    );

    return resultArray.map((cartItem) => {
      return (
        <li key = { cartItem.productKey }>
          <ProductPreview
            name = { cartItem.name }
            selectDate = { cartItem.selectDate }
            selectDirectionTitle = { cartItem.selectDirectionTitle }
            selectTicket = { cartItem.selectTicket }
            selectTime = { cartItem.selectTime }
            selectTimeKey = { cartItem.selectTimeKey }
          />
        </li>
      );
    });
  };

  return cart ? (
    <div className = { Styles.cart }>
      <ul className = { Styles.list }>{_renderProduct()}</ul>
      <div className = { Styles.aside }>
        <ul className = { Styles.listPreview }>{_renderProductPreview()}</ul>
        <div className = { 'cart__user' }>
          <div>
            <label>
                    Ф. И. О.:
              <input
                name = 'fullName'
                value = { fullName }
                onChange = { _setUserData }
              />
            </label>
          </div>
          <div>
            <label>
                    Email:
              <input
                name = 'email'
                value = { email }
                onChange = { _setUserData }
              />
            </label>
          </div>
          <div>
            <label>
                    Телефон:
              <input
                name = 'phone'
                value = { phone }
                onChange = { _setUserData }
              />
            </label>
          </div>
          <button type = 'button' onClick = { _checkOut }>
            Купить
          </button>
        </div>
      </div>
    </div>
  ) :
    'Загрузка…';
};
