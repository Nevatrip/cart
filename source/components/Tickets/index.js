// Core
import React, { Component } from 'react';

// Components
import Counter from '../Counter';

export default class Tickets extends Component {

    _renderTickets = () => {
        const { tickets, _selectedTicket } = this.props;

        const result = tickets.map((item) => {

            return (
                <div key = { item._key } style = { { display: 'flex' } } >
                    <dt>{item.name || '???'}, {item.price} ₽</dt>
                    <dd>
                        <Counter
                            _selectedTicket = { _selectedTicket }
                            prise = { item.price }
                            ticketKey = { item._key }
                            typeTicket = { item.name }
                        />
                    </dd>
                </div>
            );
        });

        return result;
    }

    render () {

        return (
            <dl>
                {this._renderTickets()}
            </dl>
        );
    }
}
