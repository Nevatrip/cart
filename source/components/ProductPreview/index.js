// Core
import React from 'react';
import fromUnixTime from 'date-fns/fromUnixTime';
import format from 'date-fns/format';

const ProductPreview = (props) => {
    const { name, selectDate, selectDirectionTitle, selectTicket, selectTime } = props;
    const date = format(fromUnixTime(selectTime), 'yyyy-MMMM-dd');
    const time = format(fromUnixTime(selectTime), 'HH-mm');

    const _renderPriseTicket = () => {
        return (
            Object.keys(selectTicket).length <= 0 ? null :
                Object.values(selectTicket).map((item, index) => {
                    console.log(item.ticketKey);

                    return (

                        <li key = { index }>
                            <div>
                                {`Тип билета: ${item.typeTicket}
                                    Цена: ${item.currentPrise}
                                    Количество: ${item.count}
                                    Итого: ${item.prise}`}
                            </div>
                        </li>

                    );
                })
        );
    };

    return (
        <>
            <fieldset>
                <legend>
                    { name }
                </legend>
                <ul>
                    <li>Дата: { date }</li>
                    <li>Время: {time}</li>
                    <li>Направление: {selectDirectionTitle}</li>
                </ul>
                <div>
                    Билеты: {_renderPriseTicket()}
                </div>

            </fieldset>
        </>
    );
};

export default ProductPreview;
