// Core
import React, { Component } from 'react';
import getUnixTime from 'date-fns/getUnixTime';

// Components
import Calendar from '../Calendar';
import Directions from '../Directions';
import Time from '../Time';

// Instruments
import { api } from '../../REST';

export default class Product extends Component {

    state = {
        dates:           this.props.dates,
        selectDirection: this.props.selectDirection,
        selectDate:      this.props.selectDate,
    }
    componentDidMount () {
        this._getTime();
    }

    _getTime = async () => {
        const { productId } = this.props;
        const { selectDirection, selectDate } =this.state;

        // console.log(productId);
        // console.log(selectDirection);
        console.log('unix', getUnixTime(selectDate));
        const time = await api.product.getProductTime(productId, selectDirection, selectDate);

        console.log('time', time);
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
                {/* <Time /> */}
            </>
        );
    }
}
