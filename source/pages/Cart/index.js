// Core
import React, { Component } from 'react';
import fromUnixTime from 'date-fns/fromUnixTime';

// Components
import Product from '../../components/Product';
import ProductPreview from '../../components/ProductPreview';
import Counter from '../../components/Counter';

// Instruments
import { api } from '../../REST';

export default class Cart extends Component {

    state = {
        cart:      [],
        products:  [],
        totalData: {},
    }
    componentDidMount () {
        const { sessionId } = this.props;

        this._createdCart(sessionId);
    }

    _createdCart = async (sessionId) => {
        const cartItems = (await api.cart.newCart(sessionId)).products;

        const cart = {};

        cartItems.forEach((item) => {
            cart[item.productId] = item.productId;
        });

        /*
        cart = {
            '1949faec-c728-40de-a700-ca5b666ba765': '1949faec-c728-40de-a700-ca5b666ba765',
            '41b1283d-2ad1-4894-b03e-368042e5d301': '41b1283d-2ad1-4894-b03e-368042e5d301'
        }
        */

        // const productsInCart = new Set(...productsInCartAll );

        const productsResponse = await Promise.all(
            Object.keys(cart).map((item) => {
                return api.product.getProductData(item);
            })
        );

        productsResponse.forEach((product) => {
            cart[product._id] = product;
        });

        /*
        cart = {
            '1949faec-c728-40de-a700-ca5b666ba765': {…},
            '41b1283d-2ad1-4894-b03e-368042e5d301': {…}'
        }
        */

        const products = cartItems.map((item) => ({
            ...item,
            ...cart[item.productId],
        }));

        // eslint-disable-next-line no-debugger
        // debugger;

        this.setState({ cart, products });

    }
    _setTotalData = (cartItem) => {
        const { totalData } = this.state;

        totalData[cartItem.productKey] = cartItem;

        this.setState({ totalData });
    }
    _updateCartItem = (data) => {
        const { totalData } = this.state;

        totalData[data.productKey] = data;

        this.setState({ totalData });
    }
    _checkOut = () => {
        const { totalData } = this.state;

        console.log('_checkOut', totalData);
    }

    _renderProduct = () => {
        const { products } = this.state;

        const result = products.length
            ? products.map((product) => {
                return (
                    <li key = { product.key }>
                        <Product
                            _setTotalData = { this._setTotalData }
                            _updateCartItem = { this._updateCartItem }
                            dates = { product.directions[0].dates }
                            directionsAll = { product.directions }
                            name = { product.title.ru.name }
                            productId = { product._id }
                            productKey = { product.key }
                            selectDate = { fromUnixTime(
                                product.directions[0].dates[0]
                            ) }
                            selectDirection = { product.directions[0]._key }
                            selectTickets = { product.directions[0].tickets }
                        />
                    </li>
                );
            })
            : 'Корзина пуста';

        return result;

    }
    _renderProductPreview = () => {
        const { totalData } = this.state;

        return (
            Object.values(totalData).map((cartItem) => {

                return (
                    <li key = { cartItem.productKey }>
                        <ProductPreview
                            name = { cartItem.name }
                            selectDate = { cartItem.selectDate }
                            selectDirection = { cartItem.selectDirection }
                            selectTime = { cartItem.selectTime }
                            selectTimeKey = { cartItem.selectTimeKey }
                        />
                    </li>

                );
            })
        );

    }

    render () {

        return (
            <>
                <div className = { 'cart' }>
                    <ul className = { 'cart__list' }>

                        { this._renderProduct() }

                        <br /><br /><br />
                        <button
                            type = 'button'
                            onClick = { this._checkOut }>
                            Купить
                        </button>

                    </ul>

                    <ul className = { 'cart__aside' }>
                        {this._renderProductPreview()}
                    </ul>
                </div>
            </>
        );
    }
}
