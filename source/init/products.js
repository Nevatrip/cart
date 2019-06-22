
export default (store) => {
    store.on('@init', () => ({ products: {}}));

    store.on('products/get', (state, products) => ({ products }));
};
