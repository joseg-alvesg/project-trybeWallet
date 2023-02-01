import { combineReducers } from 'redux';
import { user } from './user';
import { wallet } from './wallet';

// const INITIAL_STATE = {

//   wallet: {
//     currencies: [], // array de string
//     expenses: [], // array de objetos, com cada objeto tendo as chaves id, value, currency, method, tag, description e exchangeRates
//     editor: false, // valor booleano que indica de uma despesa está sendo editada
//     idToEdit: 0, // valor numérico que armazena o id da despesa que esta sendo editada
//   },
// };

const rootReducer = combineReducers({ user, wallet });

export default rootReducer;
