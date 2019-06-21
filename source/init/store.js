// Core
import createStore from 'storeon';

import projects from './projects';
import user from './user';
import cart from './cart';

export const store = createStore(
    [
        cart,
        projects,
        user,
        process.env.NODE_ENV !== 'production' && require('storeon/devtools')
    ]
);
