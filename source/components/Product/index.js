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
    }

    componentDidMount () {
        this._getTime();
    }

    _getTime = async () => {
        const { productId } = this.props;
        const { selectDirection, selectDate } =this.state;

        const date =  format(selectDate, 'yyyy-MM-dd', new Date());
        const time = await api.product.getProductTime(productId, selectDirection, date);

        this.setState({ times: time });
        this._selectedTime(time[0]._key);
    }

    _selectedTime = (time) => {
        this.setState({ selectedTime: time });
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
        const { directionsAll, name, productId } = this.props;

        return (
            <fieldset>
                <legend>
                    { name }
                </legend>
                <Calendar
                    _selectedDate = { this._selectedDate }
                    dates = { this.state.dates }
                    selectDate = { this.state.selectDate }
                />
                <br />
                {
                    directionsAll.length <= 1 ? // Проверка на количество направлений экскурсии //
                        null :
                        <Directions
                            _selectedDirection = { this._selectedDirection }
                            directionsAll = { directionsAll }
                            selectDirection = { this.state.selectDirection }
                        />
                }
                {
                    this.state.times &&
                    <Time
                        productKey = { productId }
                        selectedTime = { this.state.selectedTime }
                        timesAll = { this.state.times }
                    />
                }
            </fieldset>
        );
    }
}
