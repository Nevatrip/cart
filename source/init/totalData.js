// Instruments
import { api } from '../REST';

export default (store) => {
  store.on('@init', () => ({ totalData: {} }));

  store.on('totalData/get', ({ totalData }, cartItem) => {
    totalData[cartItem.productKey] = cartItem;

    return { totalData };
  });
  store.on('totalData/updateCartItem', async ({ totalData }, data) => {

    const cart = store.get().cart;
    const sessionId = store.get().session;

    totalData[data.productKey] = data;

    const products = cart.map((cartItem) => {
      const {
        selectDirection,
        selectTime,
        selectTimeKey,
        selectTicket,
      } = totalData[cartItem.key];

      const tickets = {};

      Object.values(selectTicket).forEach((ticket) => {
        tickets[ticket.ticketKey] = ticket.count;
      });

      return {
        productId: cartItem._id,
        options:   {
          direction: selectDirection,
          date:      selectTime,
          time:      selectTimeKey,
          tickets,
        },
      };
    });

    await api.cart.updateCart(sessionId, products);

    return { totalData };
  });

  store.on('totalData/updateCart', ({ totalData }, cartItem) => {
    totalData[cartItem.productKey] = cartItem;

    return { totalData };
  });

};
