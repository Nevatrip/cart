// Core
import React, { useEffect } from 'react';
import fromUnixTime from 'date-fns/fromUnixTime';
import useStoreon from 'storeon/react';
import { api } from '../../REST';

// Components
import { Product } from '../../components/Product';
import { ProductPreview } from '../../components/ProductPreview';
import Catcher from '../../components/Catcher';

// Instruments
import Styles from './styles.m.css';

export const Cart = (props) => {
  const { dispatch, user, cart, totalData } = useStoreon('user', 'cart', 'totalData', 'session');
  const { sessionId } = props;
  const { fullName, email, phone } = user;

  useEffect(() => {
    dispatch('session/id', sessionId);
    dispatch('cart/get');

    return () => {}; // ???
  }, []);

  const _setUserData = (event) => {
    user[event.target.name] = event.target.value;

    dispatch('user/change', user);
  };

  const _checkOut = async () => {
    const order = {
      sessionId,
      user,
    };

    const response = await api.order.newOrder(order);

    console.log('order', response);

    if ((((response || {}).payment || {}).Model || {}).Url) {
      window.location.href = response.payment.Model.Url;
    }
  };

  const _renderProduct = () => {
    const result = cart.length
      ? cart.map(({ _id, key, title, directions, options }, index) => {
        const direction =
          directions.find(
            ({ _key }) => _key === (options || {}).direction
          ) || directions[0];

        return (
          <Catcher key = { key }>
            <li className = { Styles.product }>
              <Product
                date = { fromUnixTime(
                  options && options.date > direction.dates[0]
                    ? options.date
                    : direction.dates[0]
                ) }
                dates = { direction.dates }
                direction = { direction._key }
                directionsAll = { directions }
                directionTitle = { direction.title }
                indexItem = { index }
                name = { title.ru.name }
                productId = { _id }
                productKey = { key }
                tickets = { direction.tickets }
              />
            </li>
          </Catcher>

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
        <li key = { cartItem.productKey } className = 'listPreviewLi'>
          <ProductPreview
            date = { cartItem.date }
            directionTitle = { cartItem.directionTitle }
            event = { cartItem.event }
            name = { cartItem.name }
            selectedTicket = { cartItem.selectedTicket }
            selectedTime = { cartItem.selectedTime }
            showDirection = { false }
          />
        </li>
      );
    });
  };

  return cart ? (
    <div className = 'cart' >
      <ul className = 'list' >{_renderProduct()}</ul>
      <div className = 'aside' >
        <span className = 'caption'>Ваш заказ</span>
        <ul className = 'listPreview' >{_renderProductPreview()}</ul>
        <div className = 'asideSeparator' ></div>
        <div className = { 'cart__user' }>
          {
            [
              { name: 'fullName', value: fullName, label: 'Ф. И. О.' },
              { name: 'email', value: email, label: 'Email' },
              { name: 'phone', value: phone, label: 'Телефон' }
            ].map((field) => (<div key = { field.name }>
              <label className =  'form-label'>
                <span className = 'caption'> { field.label } </span>
                <input
                  className =  'input'
                  name = { field.name }
                  value = { field.value }
                  onChange = { _setUserData }
                />
              </label>
            </div>))
          }
          <span className = 'checkbox'>
            <input className = 'checkboxInput' type = 'checkbox' required = 'required' id = 'ofertaCheck'/>
            <label className = 'caption checkboxCaption' for = 'ofertaCheck'>Согласен с условиями возврата</label>
          </span>
          <button className =  'btn btn_block btn_primary' type = 'button' onClick = { _checkOut }>
            Купить
          </button>
        </div>
      </div>
    </div>
  ) :
    'Загрузка…';
};
