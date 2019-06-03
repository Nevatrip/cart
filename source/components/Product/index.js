// Core
import React, { Component } from 'react';

// Components
import Calendar from '../Calendar';
import Directions from '../Directions';

export default class Cart extends Component {

    render () {
        const {
            directionsAll,
            selectDirection,
            dates,
            selectDate,
        } = this.props;

        return (
            <>
                <Calendar
                    _selectedDate = { this._selectedDate }
                    dates = { dates }
                    selectDate = { selectDate }
                />
                {
                    directionsAll.length <= 1 ? // Проверка на количество направлений экскурсии //
                        null :
                        <Directions
                            _selectedDirection = { this._selectedDirection }
                            direction = { selectDirection }
                            directionsAll = { directionsAll }
                        />
                }
            </>
        );
    }
}
