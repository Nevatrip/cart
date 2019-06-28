// Instruments
import { api } from '../REST';

export default (store) => {
  store.on('@init', () => ({ totalData: {} }));

  store.on('totalData/get', (prevState, data) => ({ totalData: data }));

  // store.on('totalData/updateCartItem', async ({ totalData }, data) => {

  //   const cart = store.get().cart;
  //   const sessionId = store.get().session;

  //   totalData[data.productKey] = data;

  //   const products = cart.map((cartItem) => {
  //     const {
  //       direction,
  //       selectedTime,
  //       event,
  //       selectedTicket,
  //     } = totalData[cartItem.key];

  //     const tickets = {};

  //     Object.values(selectedTicket).forEach((ticket) => {
  //       tickets[ticket.ticketKey] = ticket.count;
  //     });

  //     return {
  //       productId: cartItem._id,
  //       options:   {
  //         direction: direction,
  //         date:      selectedTime,
  //         time:      event,
  //         tickets,
  //       },
  //     };
  //   });

  //   await api.cart.updateCart(sessionId, products);

  //   return { totalData };
  // });

  store.on('totalData/updateCart', ({ totalData }, cartItem) => {
    totalData[cartItem.productKey] = cartItem;

    return { totalData };
  });
};
