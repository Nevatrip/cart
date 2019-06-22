const cartItem = {};

export default (store) => {
    store.on('@init', () => ({ cartItem }));

    store.on('cartItem/init', ({ cartItem }, item) => {

        return { cartItem: item };
    });

};
