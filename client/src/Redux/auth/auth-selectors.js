const getIsLoggedIn = state => state.auth.isLoggedIn;
const getUserName = state => state.auth.user.username;
const getRefreshing = state => state.auth.isRefreshing;
// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getIsLoggedIn,
  getUserName,
  getRefreshing,
};
