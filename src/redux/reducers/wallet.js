import { GET_COIN, EXPENSES, DELETE_EXPENSE } from '../actions/walletAction';

const INITIAL_STATE = {
  currencies: [], // array de string
  expenses: [], // array de objetos, com cada objeto tendo as chaves id, value, currency, method, tag, description e exchangeRates
  editor: false, // valor booleano que indica de uma despesa está sendo editada
  idToEdit: 0, // valor numérico que armazena o id da despesa que esta sendo editada
};

export const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case GET_COIN:
    return {
      ...state,
      currencies: action.payload,
    };
  case EXPENSES:
    return {
      ...state,
      expenses: [...state.expenses, { ...action.payload }],
    };
  case DELETE_EXPENSE:
    return {
      ...state,
      expenses: state
        .expenses.filter((expense) => expense.id !== Number(action.payload)),
    };
  default:
    return state;
  }
};
