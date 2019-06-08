// Core
import React, { Component } from 'react';
import DatePicker, { registerLocale } from 'react-datepicker';
import ru from 'date-fns/locale/ru';
import fromUnixTime from 'date-fns/fromUnixTime';
registerLocale('ru-RU', ru);

// Styles
import 'react-datepicker/dist/react-datepicker.css';

export default class Calendar extends Component {
  _changeDate = (date) => {
      this.props._selectedDate(date);
  }

  _includeDates = () => {
      const { dates } = this.props;

      const result = dates.map((item) => {
          return fromUnixTime(item);
      });

      return result;
  }

  render () {
      const { selectDate } = this.props;

      return (
          <label>
          Выберите дату
              <DatePicker
                  dateFormat = 'dd MMMM YYYY'
                  includeDates = { this._includeDates() }
                  locale = 'ru-RU'
                  selected = { selectDate }
                  onChange = { this._changeDate }
              />
          </label>
      );
  }
}
