// Core
import React, { Component } from 'react';

export default class Directions extends Component {

    _changeDirection = (event) => {
        const { _selectedDirection } = this.props;
        const selectIndex = event.target.options.selectedIndex;
        const titleDirection = event.target.children[selectIndex].dataset.title;

        _selectedDirection(event.target.value, titleDirection);

    }

    render () {
        const { directionsAll, selectDirection } = this.props;

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
