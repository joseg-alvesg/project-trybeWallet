import coinsApi from '../../helpers/handleApi';

export const REQUEST_API = 'REQUEST_API';
export const GET_COIN = 'GET_COIN';

const requestApi = () => ({ type: REQUEST_API });
const getCoin = (data) => ({ type: GET_COIN, payload: data });

export const actionCoin = () => async (dispatch) => {
  try {
    await dispatch(requestApi());
    const request = await coinsApi();
    const data = Object.keys(request).filter((currencie) => currencie);
    await dispatch(getCoin(data));
  } catch (err) {
    console.log(err);
  }
};

export const EXPENSES = 'EXPENSES';

const currencie = (data) => ({ type: EXPENSES, payload: data });

export const actionExpense = (data) => async (dispatch) => {
  try {
    await dispatch(requestApi());
    const request = await coinsApi();
    const response = Object.values(request)
      .filter((coin) => (coin.code === data.coin));
    console.log(response);
    data = { ...data, currencie: response[0].ask };
    console.log(data);
    await dispatch(currencie(data));
  } catch (err) {
    console.log(err);
  }
};
