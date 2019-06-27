// Core
import React from 'react';
import format from 'date-fns/format';
import ru from 'date-fns/locale/ru';

export const ProductPreview = (props) => {
  const { name, selectDirectionTitle, showDirection, selectTicket, selectTime, selectDate } = props;

  console.log('productPreview', selectTime);

  const date = format(selectDate, 'dd MMMM yyyy', { locale: ru });
  // const time = format(selectTime, 'HH:mm');

  const _renderPriseTicket = () => {
    return (
      Object.values(selectTicket).map((item, index) => {
        return (
          <li key = { index }>
            <div>
              {`${item.typeTicket}: ${item.currentPrise} ₽ × ${item.count} = ${item.prise} ₽`}
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
        <div>Билеты: {_renderPriseTicket()}</div>
      </fieldset>
    </>
  );
};
