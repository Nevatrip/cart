// Core
import React, { Component } from 'react';

// Components
import Calendar from '../Calendar';
import Directions from '../Directions';

export default class Cart extends Component {

    state = {
        dates:           this.props.dates,
        selectDirection: this.props.selectDirection,
        selectDate:      this.props.selectDate,
    }

    _selectedDirection = (direction) => {
        this.setState({ selectDirection: direction });

        this._setProductDate(direction);

    }
    _setProductDate = (direction) => {
        const { directionsAll } = this.props;
        const selectedDirection = directionsAll.filter((item) => {
            return (

                item._key === direction
            );
        });
        const dates = selectedDirection[0].dates;

        this.setState({ dates });
    }
    _selectedDate = (date) => {
        this.setState({ selectDate: date });
    }

    render () {
        const { directionsAll } = this.props;

        return (
            <>
                <Calendar
                    _selectedDate = { this._selectedDate }
                    dates = { this.state.dates }
                    selectDate = { this.state.selectDate }
                />
                {
                    directionsAll.length <= 1 ? // Проверка на количество направлений экскурсии //
                        null :
                        <Directions
                            _selectedDirection = { this._selectedDirection }
                            directionsAll = { directionsAll }
                            selectDirection = { this.state.selectDirection }
                        />
                }
            </>
        );
    }
}
