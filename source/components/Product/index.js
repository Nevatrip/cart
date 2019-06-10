// Core
import React, { Component } from 'react';
import { format } from 'date-fns';

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
        selectTimeKey:   '',
        selectTime:      '',
    }

    componentDidMount () {
        this._getTime();
    }

    _getTime = async () => {
        const { productId } = this.props;
        const { selectDirection, selectDate } = this.state;

        const date =  format(selectDate, 'yyyy-MM-dd', new Date());
        const time = await api.product.getProductTime(productId, selectDirection, date);

        this.setState({ times: time });

        const selectedTimeKey = time[0]._key;
        const selectedTime = time[0].start;

        this._selectedTime(selectedTimeKey, selectedTime);
    }

    _selectedTime = (selectedTimeKey) => {

        this.setState({ selectTimeKey: selectedTimeKey });
    }

    _selectedDirection = (direction) => {
        this.setState({ selectDirection: direction }, () => {
            this._setProductDate(direction);
        });
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
        this.setState({ selectDate: date }, () => {
            this._getTime();
        });
    }

    render () {
        const {
            directionsAll,
            name,
            productId,
            _setTotalData,
        } = this.props;

        const {
            dates,
            selectDate,
            selectDirection,
            selectTime,
            selectTimeKey,
            times,
        } = this.state;

        return (
            <fieldset>
                <legend>
                    { name }
                </legend>
                <Calendar
                    _selectedDate = { this._selectedDate }
                    dates = { dates }
                    selectDate = { selectDate }
                />
                <br />
                {
                    directionsAll.length <= 1 ? // Проверка на количество направлений экскурсии //
                        null :
                        <Directions
                            _selectedDirection = { this._selectedDirection }
                            directionsAll = { directionsAll }
                            selectDirection = { selectDirection }
                        />
                }
                {
                    this.state.times &&
                    <Time
                        _selectedTime = { this._selectedTime }
                        _setTotalData = { _setTotalData }
                        productKey = { productId }
                        selectDate = { selectDate }
                        selectDirection = { selectDirection }
                        selectTime = { selectTime }
                        selectTimeKey = { selectTimeKey }
                        timesAll = { times }
                    />
                }
            </fieldset>
        );
    }
}
