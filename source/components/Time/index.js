// Core
import React, { Component } from 'react';
import { format } from 'date-fns';

export default class Time extends Component {

    _changeTime = (event) => {
        const {
            _selectedTime,
            _updateCartItem,
            cartItem,
        } = this.props;

        const selectTimeKey = event.target.value;
        const selectTime = Number(event.target.dataset.time);

        cartItem.selectTime = selectTime;
        cartItem.selectTimeKey = selectTimeKey;
        _selectedTime(selectTimeKey);
        _updateCartItem(cartItem);

    }

    render () {
        const { timesAll, cartItem } = this.props;

        const renderTimes =  timesAll.map((item, index) => {

            return (
                <li data-key = { item._key } key = { item._key }>
                    <label>
                        <input
                            checked = { cartItem.selectTimeKey ? cartItem.selectTimeKey === item._key : index === 0 }
                            data-time = { item.start }
                            name = { `time-${cartItem.productKey}` }
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
