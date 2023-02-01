import { USER_LOGIN } from '../actions';

const INITIAL_STATE = {
  email: '', // string que armazena o email da pessoa usuária
  password: '', // string que armazena a senha da pessoa usúaria

};

export const user = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case USER_LOGIN:
    return {
      ...state,
      email: action.payload.email,
      password: action.payload.password,
    };
  default:
    return state;
  }
};
