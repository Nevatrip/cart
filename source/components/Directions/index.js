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
  const direction = totalData.direction;

  const _changeDirection = (event) => {
    const selectIndex = event.target.options.selectedIndex;
    const titleDirection = event.target.children[selectIndex].dataset.title;
    const currentDirection = directionsAll[event.target.value];

    currentItem.direction = event.target.value;
    currentItem.directionTitle = titleDirection;
    currentItem.date = fromUnixTime(currentDirection.dates[0]);
    dispatch('totalData/updateCart', currentItem);
    _changeProductData(event.target.value);
  };

  const renderDirections = Object.values(directionsAll).map((item) => {
    return (
      <option
        data-key = { item._key }
        data-title = { item.title }
        defaultValue = { item._key === direction }
        key = { item._key }
        value = { item._key }>
        {item.title}
      </option>
    );
  });

  return (
    <label>
      <span className = 'caption'>Выберите направление</span>
      <select text = 'true' onChange = { _changeDirection } className = 'input'>
        {renderDirections}
      </select>
    </label>
  );
};
