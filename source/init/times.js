// Core
import { format } from 'date-fns';
import fromUnixTime from 'date-fns/fromUnixTime';

// Instruments
import { api } from '../REST';

const times = [];

export default (store) => {
    store.on('@init', () => ({ times }));

    store.on('times/get', async ({ times }, timeData) => {

        const { selectDate, selectDirection, productId } = timeData;
        const date =  format(selectDate, 'yyyy-MM-dd', new Date());
        console.log('date', date)
        console.log('selectDirection', selectDirection)
        const time = await api.product.getProductTime(productId, selectDirection, date);

        console.log('time', time);
        store.dispatch('times/addState', time);

        // const cart = store.get().cart;
        // console.log('store.get()',store.get())
        // const date =  format(selectDate, 'yyyy-MM-dd', new Date());
        // console.log('test')

    });

    store.on('times/addState', ({ times }, time) => {

        return { times: time };
    });

};
