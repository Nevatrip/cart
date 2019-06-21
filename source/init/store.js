// Core
import createStore from 'storeon';

import projects from './projects';
import user from './user';

export const store = createStore(
    [
        projects,
        user,
        process.env.NODE_ENV !== 'production' && require('storeon/devtools')
    ]
);
