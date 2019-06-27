// Core
import React from 'react';
import format from 'date-fns/format';
import ru from 'date-fns/locale/ru';

export const ProductPreview = (props) => {
  const { name, selectDirectionTitle, showDirection, selectTicket, selectTime, selectDate } = props;
  const date = format(selectDate, 'dd MMMM yyyy', { locale: ru });

  const _renderPriceTicket = () => {
    return (
      Object.values(selectTicket).map((item, index) => {
        console.log(item);
        
        return (
          <li key = { index }>
            <div>
              {`${item.typeTicket}: ${item.currentPrice} ₽ × ${item.count} = ${item.price} ₽`}
            </div>
          </li>
        );
      })
    );
  };

  return (
    <>
      <fieldset>
        <legend>{name}</legend>
        <ul>
          <li>Дата: {date}</li>
          <li>Время: {selectTime}</li>
          {showDirection && <li>Направление: {selectDirectionTitle}</li>}
        </ul>
        <div>Билеты: {_renderPriceTicket()}</div>
      </fieldset>
    </>
  );
};
