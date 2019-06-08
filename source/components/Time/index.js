// Core
import React, { Component } from 'react';
import { format } from 'date-fns';

export default class Time extends Component {

    _changeTime = (event) => {
        const { _selectedTime } = this.props;

        _selectedTime(event.target.value);

    }

    render () {
        const { timesAll, selectedTime, productKey } = this.props;

        const renderTimes =  timesAll.map((item, index) => {

            return (
                <li data-key = { item._key } key = { item._key }>
                    <label>
                        <input
                            checked = { selectedTime ? selectedTime === item._key : index === 0 }
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
