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
        cart:      [],
        products:  [],
        totalData: [],
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
    _setTotalData = (selectDirection, selectDate, selectedTime, selectedTimeKey) => {
        const { totalData } = this.state;

        const selectData = {
            selectDirection,
            selectDate,
            selectedTime,
            selectedTimeKey,
        };

        totalData.push(selectData);

        this.setState({
            totalData,
        });
        console.log(this.state.totalData);

        // console.log('selectData', selectData);
        // const test = [];

        // test.push(selectData);
        // this.setState = {
        //     totalData: test,
        // };
        // console.log('test', test);
        // console.log(this.state.totalData)
        console.log('selectDirection', selectDirection);
        console.log('selectDate', selectDate);
        console.log('selectedTime', selectedTime);
        // this._createdProductData(selectData);
    }
    _createdProductData = (data) => {
        const { totalData } = this.state;

        totalData.splice(0, totalData.length - 1);

        totalData.push(data);

        this.setState({
            totalData,
        });
        console.log(this.state.totalData);

    }

    _renderProduct = () => {
        const { cart } = this.state;

        const result = cart.length
            ? cart.map((product, index) => {
                return (
                    <li key = { index }>
                        <Product
                            _setTotalData = { this._setTotalData }
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
