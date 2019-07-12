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
          <li key = { index } className = 'listPreviewTicketsLi'>
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
      <fieldset className = 'listPreviewFieldset'>
        <legend className = 'listPreviewLegend'>{name}</legend>
        <ul className = 'listPreviewData'>
          <li className = 'listPreviewDataLi'>Дата: {selectedDate}</li>
          <li className = 'listPreviewDataLi'>Время: {selectedTime}</li>
          {showDirection && <li className = 'listPreviewDataLi'>Направление: {directionTitle}</li>}
        </ul>
        <div className = 'listPreviewTickets'>Билеты: {_renderPriceTicket()}</div>
      </fieldset>
    </>
  );
};
