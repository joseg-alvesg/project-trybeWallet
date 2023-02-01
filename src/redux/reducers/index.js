import { combineReducers } from 'redux';

const INITIAL_STATE = {
  user: {
    email: '', // string que armazena o email da pessoa usuária
    password: '', // string que armazena a senha da pessoa usúaria
  },
  wallet: {
    currencies: [], // array de string
    expenses: [], // array de objetos, com cada objeto tendo as chaves id, value, currency, method, tag, description e exchangeRates
    editor: false, // valor booleano que indica de uma despesa está sendo editada
    idToEdit: 0, // valor numérico que armazena o id da despesa que esta sendo editada
  },
};

export const userReducer = (state = INITIAL_STATE, { type }) => {
  switch (type) {
  default:
    return state;
  }
};

const rootReducer = combineReducers({ userReducer });

export default rootReducer;
