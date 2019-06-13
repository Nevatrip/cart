// Core
import React, { Component } from 'react';

export default class Directions extends Component {

    _changeDirection = (event) => {
        const {
            _selectedDirection,
            _updateCartItem,
            cartItem,
        } = this.props;

        cartItem.selectDirection = event.target.value;
        _selectedDirection(event.target.value);
        _updateCartItem(cartItem);

    }

    render () {
        const { directionsAll } = this.props;

        const renderDirections =  Object.values(directionsAll).map((item) => {

            return (

                <option data-key = { item._key } key = { item._key } value = { item._key }>{item.title}</option>
            );
        });

        return (
            <label>
                Выберите направление
                <select onChange = { this._changeDirection }>

                    {renderDirections}
                </select>
            </label>

        );
    }
}
