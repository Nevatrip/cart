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
        cart: [],
    }
    componentDidMount () {
        const { sessionId } = this.props;

        this._createdCart(sessionId);
    }

    _createdCart = async (sessionId) => {
        const { products } = await api.cart.newCart(sessionId);
        const productsInCart = products.map((item) => {
            return item.productId;
        });

        const cart = await Promise.all(
            productsInCart.map((item) => {
                return api.product.getProductData(item);
            })
        );

        this.setState({ cart });

    }

    _renderProduct = () => {
        const { cart } = this.state;

        const result = cart.map((product, index) => {

            return (
                <Product
                    dates = { product.directions[0].dates }
                    direction = { product.directions[0]._key }
                    directionsAll = { product.directions }
                    key = { index }
                    selectDate = { formatDate(product.directions[0].dates[0]) }
                />
            );
        });

        return result;

    }

    render () {

        return (
            <>
                <div className = { 'cart' }>
                    <div className = { 'cart__list' }>

                        { this._renderProduct() }

                    </div>

                    <div className = { 'cart__aside' }>
                        <ProductPreview />
                    </div>
                </div>

            </>
        );
    }
}
