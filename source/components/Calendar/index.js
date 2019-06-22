// Core
import React, { Component } from 'react';
import DatePicker, { registerLocale } from 'react-datepicker';
import ru from 'date-fns/locale/ru';
import fromUnixTime from 'date-fns/fromUnixTime';
registerLocale('ru-RU', ru);
import connect from 'storeon/react/connect';
import { store } from '../../init/store';


// Styles
import 'react-datepicker/dist/react-datepicker.css';

class Calendar extends Component {
  _changeDate = (date) => {
      const { dispatch, productKey, totalData, _selectedDate } = this.props;
      const currentItem = totalData[productKey];

      currentItem.selectDate = date;

      dispatch('totalData/updateCart', currentItem);

      //   _selectedDate(date);
  }

  _includeDates = () => {
      const { dates } = this.props;

      const result = dates.map((item) => {
          return fromUnixTime(item);
      });

      return result;
  }

  render () {
      const { productKey, totalData, selectDate } = this.props;
      //   const  = totalData[productKey].selectDate;

    //   console.log('Calendar', totalData[productKey]);
    //   console.log('store', store.get().totalData[productKey]);

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
