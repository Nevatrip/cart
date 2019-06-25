export default (store) => {
  store.on('@init', () => ({
    user: {
      fullName: '',
      email:    '',
      phone:    '',
    },
  }));

  store.on('user/change', ({ user }, newUserData) => {
    user[newUserData];

    return { user };
  });
};
