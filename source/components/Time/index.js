// Core
import React, { Component } from 'react';
import { format } from 'date-fns';
import connect from 'storeon/react/connect';

class Time extends Component {

    _changeTime = (event) => {
        const {
            _selectedTime,
            dispatch,
            productKey,
            totalData,
        } = this.props;

        const currentItem = totalData[productKey];

        currentItem.selectTimeKey = event.target.value;
        currentItem.selectTime = Number(event.target.dataset.time);

        // _selectedTime(selectTimeKey, selectTime);
        // dispatch('totalData/updateCartItem');
        dispatch('totalData/updateCart', currentItem);

    }

    render () {
        const { timesAll, cartItem, totalData, productKey } = this.props;
        console.log(productKey)

        if (totalData === {}) {
            return null;
        }
        const currentItem = totalData[productKey];

        if (currentItem === void 0) {
            return null;
        }

        const renderTimes =  timesAll.map((item, index) => {

            // console.log('totalData.selectTimeKey', currentItem.selectTimeKey);
            // console.log('item', item._key);

            return (
                <li data-key = { item._key } key = { item._key }>
                    <label>
                        <input
                            checked = { currentItem.selectTimeKey ? currentItem.selectTimeKey === item._key : index === 0 }
                            data-time = { item.start }
                            name = { `time-${totalData.productKey}` }
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
export default connect('totalData', Time);
