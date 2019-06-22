// Core
import createStore from 'storeon';

import cart from './cart';
import cartItem from './cartItem';
import products from './products';
import projects from './projects';
import totalData from './totalData';
import times from './times';
import session from './session';
import user from './user';

export const store = createStore(
    [
        cart,
        cartItem,
        products,
        projects,
        times,
        totalData,
        session,
        user,
        process.env.NODE_ENV !== 'production' && require('storeon/devtools')
    ]
);
