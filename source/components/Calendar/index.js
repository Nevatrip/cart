// Core
import React, { Component } from 'react';
import DatePicker, { registerLocale } from 'react-datepicker';
import ru from 'date-fns/locale/ru';
registerLocale('ru-RU', ru);

import 'react-datepicker/dist/react-datepicker.css';

// Instruments
import { formatDate } from '../../../instruments/helpers';

export default class Calendar extends Component {

    _changeDate = (date) => {
        this.props._selectedDate(date);
    }

  _includeDates = () => {
      const { dates } = this.props;

      const result = dates.map((item) => {
          return formatDate(item);
      });

      return result;
  }
  render () {
      const { selectDate } = this.props;

      return (
          <label>
            Выберите дату
              <DatePicker
                  dateFormat = 'YYYY MMMM dd'
                  includeDates = { this._includeDates() }
                  locale = 'ru-RU'
                  selected = { selectDate }
                  onChange = { this._changeDate }
              />

          </label>
      );
  }
}
