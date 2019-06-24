// Core
import React, { Component } from 'react';
import connect from 'storeon/react/connect';

// Components
import Counter from '../Counter';

class Tickets extends Component {

    _selectedTicket = (ticket) => {
        const {
            dispatch,
            productKey,
            totalData,
        } = this.props;

        const ticketKey = Object.keys(ticket)[0];
        const currentItem = totalData[productKey];

        currentItem.selectTicket[ticketKey] = ticket[ticketKey];
        dispatch('totalData/updateCart', currentItem);

    }

    _renderTickets = () => {
        const { tickets } = this.props;

        const result = tickets.map((item) => {

            return (
                <div key = { item._key } style = { { display: 'flex' } } >
                    <dt>{item.name || '???'}, {item.price} ₽</dt>
                    <dd>
                        <Counter
                            _selectedTicket = { this._selectedTicket }
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
export default connect('totalData', Tickets);
