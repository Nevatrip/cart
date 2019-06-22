// Core
import React, { Component } from 'react';
import fromUnixTime from 'date-fns/fromUnixTime';
import connect from 'storeon/react/connect';

// Components
import Product from '../../components/Product';
import ProductPreview from '../../components/ProductPreview';

// Instruments
import { api } from '../../REST';
import Styles from './styles.m.css';

class Cart extends Component {

    state = {
        cart:      [],
        products:  {},
        totalData: {},
    }
    componentDidMount () {
        const { dispatch, sessionId } = this.props;


        dispatch('session/id', sessionId);
        dispatch('cart/get');

        // this._createdCart(sessionId);
    }

    // _createdCart = async (sessionId) => {

    //     const cartItems = (await api.cart.newCart(sessionId)).products;

    //     const products = {};

    //     cartItems.forEach((item) => {
    //         products[item.productId] = item.productId;
    //     });

    //     /*
    //     cart = {
    //         '1949faec-c728-40de-a700-ca5b666ba765': '1949faec-c728-40de-a700-ca5b666ba765',
    //         '41b1283d-2ad1-4894-b03e-368042e5d301': '41b1283d-2ad1-4894-b03e-368042e5d301'
    //     }
    //     */

    //     // const productsInCart = new Set(...productsInCartAll );

    //     const productsResponse = await Promise.all(
    //         Object.keys(products).map((item) => {
    //             return api.product.getProductData(item);
    //         })
    //     );

    //     productsResponse.forEach((product) => {
    //         products[product._id] = product;
    //     });

    //     /*
    //     cart = {
    //         '1949faec-c728-40de-a700-ca5b666ba765': {…},
    //         '41b1283d-2ad1-4894-b03e-368042e5d301': {…}'
    //     }
    //     */

    //     const cart = cartItems.map((item) => ({
    //         ...item,
    //         ...products[item.productId],
    //     }));

    //     // eslint-disable-next-line no-debugger
    //     // debugger;

    //     this.setState({ cart, products });

    // }
    _setTotalData = (cartItem) => {
        const { totalData } = this.state;

        totalData[cartItem.productKey] = cartItem;
        this.setState({ totalData });
    }
    _updateCartItem = (data) => {
        const { cart, totalData } = this.state;

        totalData[data.productKey] = data;

        const products = cart.map((cartItem) => {
            const {
                selectDirection,
                selectTime,
                selectTimeKey,
                selectTicket,
            } = totalData[cartItem.key];

            const tickets = {};

            Object.values(selectTicket).forEach((ticket) => {
                tickets[ticket.ticketKey] = ticket.count;
            });

            return {
                productId: cartItem._id,
                options:   {
                    direction: selectDirection,
                    date:      selectTime,
                    time:      selectTimeKey,
                    tickets,
                },
            };
        });

        api.cart.updateCart(this.props.sessionId, products);

        this.setState({ totalData });
        // dispatch('totalData/updateCartItem');
    }
    _checkOut = async () => {
        const { user } = this.state;

        const order = {
            sessionId: this.props.sessionId,
            user,
        };

        console.log('order', order);

        const response = await api.order.newOrder(order);

        if ((((response || {}).payment || {}).Model || {}).Url) {
            // window.location.href = response.payment.Model.Url;
        }
    }
    _setUserData = (event) => {
        const { dispatch, user } = this.props;

        user[event.target.name] = event.target.value;

        dispatch('user/change', user);
    }
    _deleteProduct = (key) => {
        // const totalData = this.state.totalData;
        // const cart = this.state.cart.filter(
        //     (product) => product.key !== key
        // );

        // delete totalData[key];

        // this.setState({ cart, totalData }, () => {
        //     api.cart.deleteItem(this.props.sessionId, key);
        // });
    }

    _renderProduct = () => {
        // const { cart } = this.state;
        const { cart } = this.props;
console.log('cart', cart)
        const result = cart.length
            ? cart.map((product, index) => {
                const direction = product.directions.find((dir) => dir._key === product.options.direction) || product.directions[0];

                return (
                    <li key = { product.key }>
                        <Product
                            _deleteProduct = { this._deleteProduct }
                            _setTotalData = { this._setTotalData }
                            _updateCartItem = { this._updateCartItem }
                            dates = { direction.dates }
                            directionsAll = { product.directions }
                            indexItem = { index }
                            name = { product.title.ru.name }
                            productId = { product._id }
                            productKey = { product.key }
                            selectDate = { fromUnixTime(product.options.date || direction.dates[0]) }
                            selectDirection = { direction._key }
                            selectDirectionTitle = { direction.title }
                            tickets = { direction.tickets }
                        />
                    </li>
                );
            })
            : 'Корзина пуста';

        return result;

    }
    _renderProductPreview = () => {
        const { totalData } = this.props;

        const resultArray = Object.values(totalData).sort((a, b) =>
            a.indexItem > b.indexItem ? 1 : -1
        );

        return (
            resultArray.map((cartItem) => {

                return (
                    <li key = { cartItem.productKey }>
                        <ProductPreview
                            name = { cartItem.name }
                            selectDate = { cartItem.selectDate }
                            selectDirectionTitle = { cartItem.selectDirectionTitle }
                            selectTicket = { cartItem.selectTicket }
                            selectTime = { cartItem.selectTime }
                            selectTimeKey = { cartItem.selectTimeKey }
                        />
                    </li>

                );
            })
        );

    }

    render () {
        const {
            user: {
                fullName,
                email,
                phone,
            },
        } = this.props;

        return (
            <>
                <div className = { Styles.cart }>
                    <ul className = { Styles.list } >
                        { this._renderProduct() }
                    </ul>

                    <div className = { Styles.aside } >
                        <ul className = { Styles.listPreview }>
                            {/* {this._renderProductPreview()} */}
                        </ul>
                        <div className = { 'cart__user' }>
                            <div>
                                <label>Ф. И. О.:
                                    <input name = 'fullName' value = { fullName } onChange = { this._setUserData } />
                                </label>
                            </div>
                            <div>
                                <label>Email:
                                    <input name = 'email' value = { email } onChange = { this._setUserData } />
                                </label>
                            </div>
                            <div>
                                <label>Телефон:
                                    <input name = 'phone' value = { phone } onChange = { this._setUserData } />
                                </label>
                            </div>
                            <button
                                type = 'button'
                                onClick = { this._checkOut }>
                                Купить
                            </button>
                        </div>
                    </div>
                </div>

            </>
        );
    }
}
export default connect('user', 'cart', 'totalData', 'session', Cart);
