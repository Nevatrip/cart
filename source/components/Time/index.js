// Core
import React, { Component } from 'react';
import { format } from 'date-fns';

export default class Time extends Component {
    componentDidMount () {
        const {
            _setTotalData,
            selectDate,
            selectDirection,
            selectTime,
            selectTimeKey,
        } = this.props;

        _setTotalData(selectDirection, selectDate, selectTime, selectTimeKey);
    }

    _changeTime = (event) => {
        const {
            _selectedTime,
            _setTotalData,
            selectDate,
            selectDirection,
        } = this.props;

        const selectedTimeKey = event.target.value;
        const selectedTime = event.target.dataset.time;

        _selectedTime(selectedTimeKey);
        _setTotalData(selectDirection, selectDate, selectedTime, selectedTimeKey);

    }

    render () {
        const { timesAll, selectTimeKey, productKey } = this.props;

        const renderTimes =  timesAll.map((item, index) => {

            return (
                <li data-key = { item._key } key = { item._key }>
                    <label>
                        <input
                            checked = { selectTimeKey ? selectTimeKey === item._key : index === 0 }
                            data-time = { item.start }
                            name = { `time-${productKey}` }
                            type = 'radio'
                            value = { item._key }
                            onChange = { this._changeTime }
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
    }
}
