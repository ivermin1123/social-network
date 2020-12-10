function GlobalStore() {}

GlobalStore.prototype.usersOnline = [];
GlobalStore.prototype.setUsersOnline = (newUsers) => {
  return (GlobalStore.prototype.usersOnline = newUsers);
};

exports.GlobalStore = new GlobalStore();
