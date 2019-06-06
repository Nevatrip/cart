// Core
import React, { Component } from 'react';

export default class Time extends Component {

    _changeDirection = (event) => {
        const { _selectedDirection } = this.props;

        _selectedDirection(event.target.value);

    }

    render () {
        const { directionsAll } = this.props;

        const renderDirections =  directionsAll.map((item) => {

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
