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

    if (totalData === {}) {
        return null;
    }

    const currentItem = totalData[productKey];
    const selectDate  = totalData[productKey].selectDate;

    const _changeDate = (date) => {

        currentItem.selectDate = date;

        dispatch('totalData/updateCart', currentItem);
    };

    const _includeDates = () => {

        const result = dates.map((item) => {
            return fromUnixTime(item);
        });

        return result;
    };

    return (
        <label>
          Выберите дату
            <DatePicker
                dateFormat = 'dd MMMM yyyy'
                includeDates = { _includeDates() }
                locale = 'ru-RU'
                selected = { selectDate }
                onChange = { _changeDate }
            />
        </label>
    );
};
