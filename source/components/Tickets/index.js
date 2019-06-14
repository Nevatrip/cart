// Core
import React, { Component } from 'react';

// Components
import Counter from '../Counter';

export default class Tickets extends Component {

    componentDidMount () {
        // console.log(this.props.cartItem.selectTickets);
    }

    
    _renderTickets = () => {
        const { selectTickets } = this.props.cartItem;
        const result = selectTickets.map((item) => {
            return (
                <ul key = { item._key }>
                    <li>
                        <fieldset>
                            <ul>
                                <li>Тип билета {item.name}</li>
                                <li>Цена {item.price}</li>
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
