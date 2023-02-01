import { USER_LOGIN } from '../actions';

const INITIAL_STATE = {
  user: {
    email: '', // string que armazena o email da pessoa usuária
    password: '', // string que armazena a senha da pessoa usúaria
  },
};

export const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case USER_LOGIN:
    return {
      ...state,
      email: action.email,
    };
  default:
    return state;
  }
};
