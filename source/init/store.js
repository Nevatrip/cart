// Core
import createStore from 'storeon';

import cart from './cart';
import products from './products';
import totalData from './totalData';
import session from './session';
import user from './user';

export const store = createStore(
    [
        cart,
        products,
        totalData,
        session,
        user,
        process.env.NODE_ENV !== 'production' && require('storeon/devtools')
    ]
);
