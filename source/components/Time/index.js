// Core
import React from 'react';
import { format } from 'date-fns';
import useStoreon from 'storeon/react';

export const Time = (props) => {

  const { dispatch, totalData } = useStoreon('totalData');
  const { timesAll, productKey } = props;

  
  if (totalData === {}) {
    return null;
  }
  if (timesAll.length === 0) {
    return null;
  }

  const currentItem = totalData[productKey];

  const _changeTime = (event) => {

    currentItem.selectTimeKey = event.target.value;
    currentItem.selectTime = Number(event.target.dataset.time);

    dispatch('totalData/updateCart', currentItem);
  };

  const renderTimes =  timesAll.map((item, index) => {
    return (
      <li data-key = { item._key } key = { item._key }>
        <label>
          <input
            checked = { currentItem.selectTimeKey ? currentItem.selectTimeKey === item._key : index === 0 }
            data-time = { item.start }
            name = { `time-${productKey}` }
            type = 'radio'
            value = { item._key }
            onChange = { _changeTime }
          />
          {format(
            new Date(item.startLabel),
            'HH:mm',
            new Date()
          )}
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
