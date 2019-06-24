// Core
import React, { Component } from 'react';
import DatePicker, { registerLocale } from 'react-datepicker';
import ru from 'date-fns/locale/ru';
import fromUnixTime from 'date-fns/fromUnixTime';
registerLocale('ru-RU', ru);
import connect from 'storeon/react/connect';

// Styles
import 'react-datepicker/dist/react-datepicker.css';

class Calendar extends Component {

  _changeDate = (date) => {
      const { dispatch, productKey, totalData } = this.props;
      const currentItem = totalData[productKey];

      currentItem.selectDate = date;

      dispatch('totalData/updateCart', currentItem);

  }

  _includeDates = () => {
      const { dates } = this.props;
      const result = dates.map((item) => {
          return fromUnixTime(item);
      });

      return result;
  }

  render () {
      const { productKey, totalData } = this.props;

      if (totalData[productKey] === void 0) {
          return null;
      }
      const selectDate  = totalData[productKey].selectDate;

      return (
          <label>
          Выберите дату
              <DatePicker
                  dateFormat = 'dd MMMM yyyy'
                  includeDates = { this._includeDates() }
                  locale = 'ru-RU'
                  selected = { selectDate }
                  onChange = { this._changeDate }
              />
          </label>
      );
  }
}
export default connect('totalData', Calendar);
