// Core
import React, { Component } from 'react';

// Components
import Counter from '../Counter';

export default class Tickets extends Component {

    _renderTickets = () => {
        const { tickets, _selectedTicket } = this.props;

        const result = tickets.map((item) => {

            return (
                <ul key = { item._key }>
                    <li>
                        <fieldset>
                            <ul>
                                <li>Тип билета {item.name}</li>
                                <li>Цена {item.price}</li>
                            </ul>

                            <Counter
                                _selectedTicket = { _selectedTicket }
                                prise = { item.price }
                                ticketKey = { item._key }
                                typeTicket = { item.name }
                            />

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
