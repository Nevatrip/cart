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
    currentItem.selectTime = time;
    currentItem.selectTimeKey = key;

    dispatch('totalData/updateCart', currentItem);
  };

  const renderTimes = timesAll.map(({ _key, startLabel }, index) => {
    const time = getActualTime(new Date(startLabel));
    const renderTime = format(time, 'HH:mm', new Date());

    return (
      <li data-key = { _key } key = { _key }>
        <label>
          <input
            checked = {
              currentItem.selectTimeKey
                ? currentItem.selectTimeKey === _key
                : index === 0
            }
            name = { `time-${productKey}` }
            type = 'radio'
            value = { _key }
            onChange = { () => _changeTime(_key, renderTime) }
          />
          {renderTime}
        </label>
      </li>
    );
  });

  return (
    <div>
      Выберите время
      <ul>
        {renderTimes}
      </ul>
    </div>

  );

};
