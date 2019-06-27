// Core
import React from 'react';
import DatePicker, { registerLocale } from 'react-datepicker';
import ru from 'date-fns/locale/ru';
import fromUnixTime from 'date-fns/fromUnixTime';
import format from 'date-fns/format';
registerLocale('ru-RU', ru);
import useStoreon from 'storeon/react';

// Styles
import 'react-datepicker/dist/react-datepicker.css';
import Styles from './styles';
export const Calendar = (props) => {
  const { dispatch, totalData } = useStoreon('totalData');
  const { productKey, dates } = props;

  const currentItem = totalData[productKey];

  if (currentItem === void 0) {
    return null;
  }

  const _changeDate = (date) => {
    currentItem.date = date;

    dispatch('totalData/updateCart', currentItem);
  };

  const _includeDates = () => {
    return dates.map((item) => fromUnixTime(item));
  };

  const date = format(currentItem.date, 'dd MMMM yyyy', { locale: ru });

  return (
    <>
      <label>
      Выберите дату
        <input
          readOnly
          type = 'text'
          value = { date }
        />
      </label>
      <div className = { Styles.calendarWrapper }>
        <DatePicker
          inline
          calendarClassName = { Styles.calendar }
          dateFormat = 'dd MMMM yyyy'
          includeDates = { _includeDates() }
          locale = 'ru-RU'
          selected = { currentItem.date }
          onChange = { _changeDate }
        />
      </div>
    </>
  );
};
