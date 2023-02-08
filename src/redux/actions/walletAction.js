import coinsApi from '../../helpers/handleApi';

export const REQUEST_API = 'REQUEST_API';
export const GET_COIN = 'GET_COIN';
export const EXPENSES = 'EXPENSES';
export const DELETE_EXPENSE = 'DELETE_EXPENSE';
export const EDIT_EXPENSE = 'EDIT_EXPENSE';
export const EDITED_EXPENSE = 'EDITED_EXPENSE';

const requestApi = () => ({ type: REQUEST_API });
const getCoin = (data) => ({ type: GET_COIN, payload: data });
const getExpense = (data) => ({ type: EXPENSES, payload: data });

export const actionCoin = () => async (dispatch) => {
  await dispatch(requestApi());
  const request = await coinsApi();
  const data = Object.keys(request).filter((currencie) => currencie);
  await dispatch(getCoin(data));
};

export const actionExpense = (data) => async (dispatch) => {
  await dispatch(requestApi());
  const request = await coinsApi();
  data = { ...data, exchangeRates: request };
  await dispatch(getExpense(data));
};

export const actionDelete = (id) => ({
  type: DELETE_EXPENSE,
  payload: id,
});

export const actionEdit = (data) => ({
  type: EDIT_EXPENSE,
  payload: data,
});

export const actionEditedExpense = (data) => ({
  type: EDITED_EXPENSE,
  payload: {
    data,
    editor: false,
  },
});
