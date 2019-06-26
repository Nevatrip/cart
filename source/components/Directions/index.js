// Core
import React from 'react';
import useStoreon from 'storeon/react';
import fromUnixTime from 'date-fns/fromUnixTime';

export const Directions = (props) => {

  const { dispatch, totalData } = useStoreon('totalData');
  const { productKey, _changeProductData, directionsAll } = props;

  if (totalData === {}) {
    return null;
  }

  const currentItem = totalData[productKey];
  const selectDirection = totalData.selectDirection;

  const _changeDirection = (event) => {

    const selectIndex = event.target.options.selectedIndex;
    const titleDirection = event.target.children[selectIndex].dataset.title;

    const currentDirection = directionsAll[event.target.value];

    currentItem.selectDirection = event.target.value;
    currentItem.selectDirectionTitle = titleDirection;
    currentItem.selectDate = fromUnixTime(currentDirection.dates[0]);
    dispatch('totalData/updateCart', currentItem);
    _changeProductData(event.target.value);
  };

  const renderDirections =  Object.values(directionsAll).map((item) => {

    return (
      <option
        data-key = { item._key }
        data-title = { item.title }
        defaultValue = { item._key === selectDirection }
        key = { item._key }
        value = { item._key }>
        {item.title}
      </option>
    );
  });

  return (
    <label>
            Выберите направление
      <select text = 'true' onChange = { _changeDirection }>
        {renderDirections}
      </select>
    </label>
  );
};
