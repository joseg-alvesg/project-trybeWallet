export const USER_LOGIN = 'USER_LOGIN';

export const userEmail = (email, password) => ({
  type: USER_LOGIN,
  payload: {
    email,
    password,
  },
});
