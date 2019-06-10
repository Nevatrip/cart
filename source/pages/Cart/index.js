// Core
import React, { Component } from 'react';
import fromUnixTime from 'date-fns/fromUnixTime';

// Components
import Product from '../../components/Product';
import ProductPreview from '../../components/ProductPreview';

// Instruments
import { api } from '../../REST';

export default class Cart extends Component {

    state = {
        cart:     [],
        products: [],
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
        debugger;

        this.setState({ cart, products });

    }

    _renderProduct = () => {
        const { cart } = this.state;

        const result = cart.length
            ? cart.map((product, index) => {
                return (
                    <li key = { index }>
                        <Product
                            dates = { product.directions[0].dates }
                            directionsAll = { product.directions }
                            name = { product.title.ru.name }
                            productId = { product._id }
                            selectDate = { fromUnixTime(
                                product.directions[0].dates[0]
                            ) }
                            selectDirection = { product.directions[0]._key }
                        />
                    </li>
                );
            })
            : 'Корзина пуста';

        return result;

    }

    render () {

        return (
            <>
                <div className = { 'cart' }>
                    <ul className = { 'cart__list' }>

                        { this._renderProduct() }

                        <br /><br /><br />
                        <button type = 'button'>Купить</button>

                    </ul>

                    <div className = { 'cart__aside' }>
                        <ProductPreview />
                    </div>
                </div>

            </>
        );
    }
}
