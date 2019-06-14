// Core
import React, { Component } from 'react';

// Components
import Counter from '../Counter';

export default class Tickets extends Component {

    componentDidMount () {
        // console.log(this.props.cartItem.selectTickets);
    }

    _changeTime = (event) => {
        const {

            cartItem,
        } = this.props;

    }

    _renderTickets = () => {
        const { selectTickets } = this.props.cartItem;
        const result = selectTickets.map((item) => {
            return (
                <ul key = { item._key }>
                    <li>
                        <fieldset>
                            <ul>
                                <li>{item.name}</li>
                                <li>{item.price}</li>
                            </ul>

                            <Counter />

                        </fieldset>
                    </li>
                </ul>
            );
        });

        return result;
    }

    render () {

        return (
            <>

                <label>
                Выберите билет

                </label>
                {this._renderTickets()}
            </>

        );
    }
}
