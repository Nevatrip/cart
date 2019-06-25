// Core
import React from 'react';
import fromUnixTime from 'date-fns/fromUnixTime';
import format from 'date-fns/format';

const ProductPreview = (props) => {
  const { name, selectDirectionTitle, selectTicket, selectTime, selectDate } = props;

  const date = format(selectDate, 'yyyy-MMMM-dd');
  const time = format(fromUnixTime(selectTime), 'HH-mm');

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
        <legend>{ name }</legend>
        <ul>
          <li>Дата: { date }</li>
          <li>Время: {time}</li>
          <li>Направление: {selectDirectionTitle}</li>
        </ul>
        <div>
          Билеты: {_renderPriseTicket()}
        </div>

      </fieldset>
    </>
  );
};

export default ProductPreview;
