// Core
import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import fromUnixTime from 'date-fns/fromUnixTime';
import connect from 'storeon/react/connect';
import useStoreon from 'storeon/react';

// Components
import { Calendar } from '../Calendar';
import { Directions } from '../Directions';
import { Time } from '../Time';
import { Tickets } from '../Tickets';

// Instruments
import { api } from '../../REST';

// class Product2 extends Component {

//     state = {
//         dates:         this.props.dates,
//         directionsAll: {},
//         tickets:       this.props.tickets,
//         times:         [],
//     }

//     componentDidMount () {

//         this._getTime();
//         this._convertObj();

//     }

//     // shouldComponentUpdate (nextProps, nextState) {
//     //     if (this.state.dates !== nextState.dates ||
//     //         this.state.tickets !== nextState.tickets ||
//     //         this.state.times !== nextState.times ||
//     //         this.state.directionsAll !== nextState.directionsAll ||
//     //         this.state.cartItem !== nextState.cartItem ||
//     //         this.props !== nextProps) {
//     //         return true;
//     //     }

//     //     return false;
//     // }

//     _convertObj = () => {
//         const { directionsAll } = this.props;

//         const directionsObj = {};

//         directionsAll.forEach((item) => {
//             directionsObj[item._key] = item;
//         });
//         this.setState({ directionsAll: directionsObj });
//     }

//     _getTime = async () => {
//         const {
//             dispatch,
//             productId,
//             selectDate,
//             productKey,
//             name,
//             selectDirection,
//             selectDirectionTitle,
//             indexItem,
//         } = this.props;

//         const cartItem = {
//             selectDirection,
//             selectDirectionTitle,
//             selectDate,
//             selectTicket:  {},
//             selectTimeKey: '',
//             selectTime:    '',
//             productKey,
//             name,
//             indexItem,
//         };

//         const date =  format(selectDate, 'yyyy-MM-dd', new Date());
//         const time = await api.product.getProductTime(productId, selectDirection, date);

//         const selectTime = time[0].start;
//         const selectTimeKey = time[0]._key;

//         cartItem.selectTime = selectTime;
//         cartItem.selectTimeKey = selectTimeKey;

//         this.setState({ times: time });
//         dispatch('totalData/get', cartItem);

//     }

//     _changeProductData = (direction) => {
//         const { directionsAll } = this.state;

//         const currentDirection = directionsAll[direction];

//         this._selectedDate(fromUnixTime(currentDirection.dates[0]));

//         this.setState({
//             dates:   currentDirection.dates,
//             tickets: currentDirection.tickets,
//         });
//     }

//     _deleteProduct = () => {
//         const { productKey, _deleteProduct } = this.props;

//         console.log('productKey', productKey);
//         _deleteProduct(productKey);
//     }

//     render () {
//         const { name, productKey, totalData } = this.props;
//         const currentItem = totalData[productKey];

//         if (currentItem === void 0) {
//             return null;
//         }

//         const {
//             dates,
//             directionsAll,
//             times,
//             tickets,
//         } = this.state;

//         return (
//             <fieldset>
//                 <legend>{ name }</legend>
//                 <Calendar
//                     dates = { dates }
//                     productKey = { productKey }
//                 />
//                 <br />
//                 {
//                     Object.values(directionsAll).length <= 1 ? // Проверка на количество направлений экскурсии //
//                         null :
//                         <Directions
//                             _changeProductData = { this._changeProductData }
//                             directionsAll = { directionsAll }
//                             productKey = { productKey }
//                         />
//                 }
//                 {
//                     this.state.times.length === 0 ?
//                         null :
//                         <Time
//                             _selectedTime = { this._selectedTime }
//                             productKey = { productKey }
//                             timesAll = { times }
//                         />
//                 }
//                 <Tickets
//                     productKey = { productKey }
//                     tickets = { tickets }
//                 />
//                 <button onClick = { this._deleteProduct } >× Удалить товар</button>
//             </fieldset>
//         );
//     }
// }
// export default connect('totalData', Product);
export const Product = (props) => {

    const { dispatch, totalData } = useStoreon('totalData');

    const {
        productId,
        selectDate,
        productKey,
        name,
        selectDirection,
        selectDirectionTitle,
        indexItem,
        directionsAll,
        dates,
        tickets,
        _deleteProduct,
    } = props;

    // const currentItem = totalData[productKey];

    // if (currentItem === void 0) {
    //     return null;
    // }

    const initialState = {
        dates,
        tickets,
        directionsAll: {},
        times:         [],
    };

    const cartItem = {
        selectDirection,
        selectDirectionTitle,
        selectDate,
        selectTicket:  {},
        selectTimeKey: '',
        selectTime:    '',
        productKey,
        name,
        indexItem,
    };

    const [state, _setState] = useState(initialState);

    const _convertObj = () => {

        const directionsObj = {};

        directionsAll.forEach((item) => {
            directionsObj[item._key] = item;
        });

        return (
            _setState({ directionsAll: directionsObj })
        );
    };

    // _convertObj();

    const _getTime = async () => {

        const date =  format(selectDate, 'yyyy-MM-dd', new Date());
        const time = await api.product.getProductTime(productId, selectDirection, date);

        console.log('time', time);
        console.log('productId', productId);
        console.log('selectDirection', selectDirection);
        console.log('date', date);

        const selectTime = time[0].start;
        const selectTimeKey = time[0]._key;

        cartItem.selectTime = selectTime;
        cartItem.selectTimeKey = selectTimeKey;

        dispatch('totalData/get', cartItem);

        return (
            _setState({ times: time })
        );
    };

    useEffect(() => {
        _convertObj();
        _getTime();
        // const directionsObj = {};

        // directionsAll.forEach((item) => {
        //     directionsObj[item._key] = item;
        // });

        // return (
        //     _setState({ directionsAll: directionsObj })
        // );
    }, [directionsAll, selectDate, productId, selectDirection]);
    // _getTime()

    const _changeProductData = (direction) => {
        // const { directionsAll } = this.state;

        const currentDirection = state.directionsAll[direction];

        this._selectedDate(fromUnixTime(currentDirection.dates[0]));

        return (
            _setState({
                dates:   currentDirection.dates,
                tickets: currentDirection.tickets,
            })
        );
    };

    const _deleteProductCart = () => {
        // const { productKey, _deleteProduct } = this.props;

        console.log('productKey', productKey);
        _deleteProduct(productKey);
    };

    console.log(state);

    return (
        <fieldset>
            <legend>{ name }</legend>
            <Calendar
                dates = { state.dates }
                productKey = { productKey }
            />
            <br />
            {/* {
                Object.values(state.directionsAll).length <= 1 ? // Проверка на количество направлений экскурсии //
                    null :
                    <Directions
                        _changeProductData = { _changeProductData }
                        directionsAll = { state.directionsAll }
                        productKey = { productKey }
                    />
            } */}
            {/* {
                state.times.length === 0 ?
                    null :
                    <Time
                        // _selectedTime = { _selectedTime }
                        productKey = { productKey }
                        timesAll = { state.times }
                    />
            } */}
            {/* <Tickets
                productKey = { productKey }
                tickets = { state.tickets }
            /> */}
            <button onClick = { _deleteProductCart } >× Удалить товар</button>
        </fieldset>
    );

};
