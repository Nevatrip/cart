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
        const { products } = await api.cart.newCart(sessionId);

        const productsInCart = products.map((item) => {
            return item.productId;
        });

        const cart = await Promise.all(
            productsInCart.map((item) => {
                return api.product.getProductData(item);
            })
        );

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
