// Core
import React from 'react';
import format from 'date-fns/format';
import ru from 'date-fns/locale/ru';

export const ProductPreview = (props) => {
  const { name, directionTitle, showDirection, selectedTicket, selectedTime, date } = props;
  const selectedDate = format(date, 'dd MMMM yyyy', { locale: ru });

  const _renderPriceTicket = () => {
    return (
      Object.values(selectedTicket).map((item, index) => {
        return (
          <li key = { index }>
            <div>
              {`${item.typeTicket}: ${item.price} ₽ × ${item.count} = ${item.sum} ₽`}
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
          <li>Дата: {selectedDate}</li>
          <li>Время: {selectedTime}</li>
          {showDirection && <li>Направление: {directionTitle}</li>}
        </ul>
        <div>Билеты: {_renderPriceTicket()}</div>
      </fieldset>
    </>
  );
};
