const totalData = {};

export default (store) => {
    store.on('@init', () => ({ totalData }));

    store.on('totalData/get', ({ totalData }, cartItem) => {
        totalData[cartItem.productKey] = cartItem;

        return { totalData };
    });
    store.on('totalData/updateCartItem', ({ totalData }) => {
        console.log(store.get().totalData);

        return { totalData };
    });
};
