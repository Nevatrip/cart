// Core
import React from 'react';
import { format } from 'date-fns';
import useStoreon from 'storeon/react';
import { getActualTime } from '../../instruments/helpers';

export const Time = (props) => {
  const { dispatch, totalData } = useStoreon('totalData');
  const { timesAll, productKey } = props;
  const currentItem = totalData[productKey];

  if (totalData === {} || timesAll.length === 0) {
    return null;
  }

  const _changeTime = (key, time) => {
    currentItem.selectedTime = time;
    currentItem.event = key;

    dispatch('totalData/updateCart', currentItem);
    dispatch('cart/update');
  };

  const renderTimes = timesAll.map(({ _key, startLabel }, index) => {
    const time = getActualTime(new Date(startLabel));
    const renderTime = format(time, 'HH:mm', new Date());
    const idAttr = `time-${productKey}-${_key}-${index}`;

    return (
      <li className = 'grid-list__item' data-key = { _key } key = { idAttr }>
        <input
          checked = {
            currentItem.event
              ? currentItem.event === _key
              : index === 0
          }
          className = 'btn-radio'
          id = { idAttr }
          name = { `time-${productKey}` }
          type = 'radio'
          value = { _key }
          onChange = { () => _changeTime(_key, renderTime) }
        />
        <label className = 'btn-radio__label' htmlFor = { idAttr }>
          {renderTime}
        </label>
      </li>
    );
  });

  return (
    <div>
      <span className = 'caption'>Выберите время отправления</span>
      <ul className = 'grid-list'>
        {renderTimes}
      </ul>
    </div>
  );
};
