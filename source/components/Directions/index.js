// Core
import React, { Component } from 'react';
import connect from 'storeon/react/connect';

class Directions extends Component {

    _changeDirection = (event) => {
        const {
            dispatch,
            productKey,
            totalData,
            _changeProductData,
        } = this.props;

        const currentItem = totalData[productKey];

        const selectIndex = event.target.options.selectedIndex;
        const titleDirection = event.target.children[selectIndex].dataset.title;

        currentItem.selectDirection = event.target.value;
        currentItem.selectDirectionTitle = titleDirection;


        dispatch('totalData/updateCart', currentItem);
        _changeProductData(event.target.value);
    }

    render () {
        const { directionsAll, totalData } = this.props;

        if (totalData === {}) {
            return null;
        }
        const selectDirection = totalData.selectDirection;
        const renderDirections =  Object.values(directionsAll).map((item) => {

            return (
                <option
                    data-key = { item._key }
                    data-title = { item.title }
                    key = { item._key }
                    selected = { item._key === selectDirection }
                    value = { item._key }>
                    {item.title}
                </option>
            );
        });

        return (
            <label>
                Выберите направление
                <select text = 'true' onChange = { this._changeDirection }>
                    {renderDirections}
                </select>
            </label>

        );
    }
}
export default connect('totalData', Directions);
