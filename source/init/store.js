// Core
import createStore from 'storeon';

import cart from './cart';
import products from './products';
import projects from './projects';
import totalData from './totalData';
import user from './user';

export const store = createStore(
    [
        cart,
        products,
        projects,
        totalData,
        user,
        process.env.NODE_ENV !== 'production' && require('storeon/devtools')
    ]
);
