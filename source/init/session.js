const session = '';

export default (store) => {
  store.on('@init', () => ({ session }));

  store.on('session/id', (state, sessionId) => ({ session: sessionId }));

};
