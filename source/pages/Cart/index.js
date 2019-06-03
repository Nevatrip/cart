// Core
import React, { Component } from 'react';

// Components
import Product from '../../components/Product';
import ProductPreview from '../../components/ProductPreview';

// Instruments
import { api } from '../../REST';
import { formatDate } from '../../../instruments/helpers';

export default class Cart extends Component {

    state = {
        dates:           [],
        selectDate:      '',
        directionsAll:   [],
        selectDirection: '',
    }
    componentDidMount () {

        this._getProductDataAsync('41b1283d-2ad1-4894-b03e-368042e5d301');
        // this._getProductDataAsync('1949faec-c728-40de-a700-ca5b666ba765');

    }

    _getProductDataAsync = async (idProduct) => {
        const dataProduct = await api.product.getProductData(idProduct);

        this._setDefaultData(dataProduct);

    }

    _setDefaultData = (dataProduct) => {
        const defaultDirection = dataProduct.directions[0]._key;
        const defaultDirectionDates = dataProduct.directions[0].dates;

        this.setState({
            dates:           defaultDirectionDates,
            selectDate:      formatDate(defaultDirectionDates[0]),
            directionsAll:   dataProduct.directions,
            selectDirection: defaultDirection,
        });
    }

    _selectedDirection = (direction) => {

        this.setState({ selectDirection: direction });

        this._setProductDate(direction);

    }

    _setProductDate = (direction) => {
        const { directionsAll } = this.state;

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
        const {
            directionsAll,
            selectDirection,
            dates,
            selectDate,
        } = this.state;

        return (
            <>
                <div className = { 'cart' }>
                    <div className = { 'cart__list' }>

                        <Product
                            _selectedDate = { this._selectedDate }
                            _selectedDirection = { this._selectedDirection }
                            dates = { dates }
                            direction = { selectDirection }
                            directionsAll = { directionsAll }
                            selectDate = { selectDate }
                        />

                    </div>

                    <div className = { 'cart__aside' }>
                        <ProductPreview />
                    </div>
                </div>

            </>
        );
    }
}
