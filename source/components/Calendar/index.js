// Core
import React from 'react';
import DatePicker, { registerLocale } from 'react-datepicker';
import ru from 'date-fns/locale/ru';
import fromUnixTime from 'date-fns/fromUnixTime';
registerLocale('ru-RU', ru);
import useStoreon from 'storeon/react';

// Styles
import 'react-datepicker/dist/react-datepicker.css';

export const Calendar = (props) => {
  const { dispatch, totalData } = useStoreon('totalData');
  const { productKey, dates } = props;

  const currentItem = totalData[productKey];

  if (currentItem === void 0) {
    return null;
  }

  const _changeDate = (date) => {
    currentItem.selectDate = date;

    dispatch('totalData/updateCart', currentItem);
  };

  const _includeDates = () => {
    return dates.map((item) => fromUnixTime(item));
  };

  return (
    <label>
      Выберите дату
      <DatePicker
        dateFormat = 'dd MMMM yyyy'
        includeDates = { _includeDates() }
        locale = 'ru-RU'
        selected = { currentItem.selectDate }
        onChange = { _changeDate }
      />
    </label>
  );
};
