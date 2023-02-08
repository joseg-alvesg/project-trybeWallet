import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import mockData from './helpers/mockData';
import { EDITED_EXPENSE } from '../redux/actions/walletAction';
import { wallet } from '../redux/reducers/wallet';

describe('Teste da cobertura do componente wallet', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: () => mockData,
    });
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  const CARTAO = 'Cartão de crédito';
  const DOLAR_NAME = 'Dólar Canadense/Real Brasileiro';
  const URL = 'https://economia.awesomeapi.com.br/json/all';

  it('teste do email e totalfield dentro do header', async () => {
    const { history, store } = renderWithRouterAndRedux(<App />);
    const email = screen.getByTestId('email-input');
    const password = screen.getByTestId('password-input');
    const button = screen.getByRole('button', { name: /entrar/i });
    expect(email).toBeInTheDocument();
    expect(password).toBeInTheDocument();
    expect(button).toBeInTheDocument();
    userEvent.click(email);
    userEvent.type(email, 'test@test.com');
    userEvent.click(password);
    userEvent.type(password, '1234567');
    userEvent.click(button);

    await waitFor(() => {
      expect(history.location.pathname).toBe('/carteira');
      expect(global.fetch).toHaveBeenCalledTimes(1);
      expect(store.getState().wallet.currencies).toHaveLength(15);
    });

    const totalField = screen.getByTestId('total-field');
    expect(totalField).toBeInTheDocument();
    expect(totalField).toHaveTextContent('0');

    const emailSpan = screen.getByText('test@test.com');
    expect(emailSpan).toBeInTheDocument();
  });

  it('Testa os inputs do documento walletForm', async () => {
    const { store } = renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'] });

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledTimes(1);
      expect(store.getState().wallet.currencies).toHaveLength(15);
    });

    const value = screen.getByRole('spinbutton', { name: /valor/i });
    const description = screen.getByRole('textbox', { name: /descrição da despesa/i });
    const currency = screen.getByRole('combobox', { name: /moeda/i });
    const method = screen.getByRole('combobox', { name: /método de pagamento/i });
    const tag = screen.getByRole('combobox', { name: /categoria da despesa/i });
    const button = screen.getByRole('button', { name: /adicionar despesa/i });

    expect(value).toBeInTheDocument();
    expect(description).toBeInTheDocument();
    expect(currency).toBeInTheDocument();
    expect(method).toBeInTheDocument();
    expect(tag).toBeInTheDocument();

    expect(value).toHaveValue(null);
    expect(description).toHaveValue('');

    expect(currency).toHaveValue('USD');

    expect(method).toHaveValue('Dinheiro');
    expect(tag).toHaveValue('Alimentação');

    userEvent.type(value, '10');
    userEvent.type(description, 'Teste');

    userEvent.selectOptions(currency, 'CAD');

    userEvent.selectOptions(method, CARTAO);
    userEvent.selectOptions(tag, 'Lazer');

    userEvent.click(button);

    waitFor(() => {
      expect(store.getState().wallet.expenses[0].value).toBe('10');
      expect(store.getState().wallet.expenses[0].description).toBe('Teste');
      expect(store.getState().wallet.expenses[0].currency).toBe('CAD');
      expect(store.getState().wallet.expenses[0].method).toBe(CARTAO);
      expect(store.getState().wallet.expenses[0].tag).toBe('Lazer');
    });
  });

  it('Testa as se os componentes da tabela existem', async () => {
    const { store } = renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'] });

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledTimes(1);
      expect(global.fetch).toHaveBeenCalledWith(URL);
      expect(store.getState().wallet.currencies).toHaveLength(15);
    });

    const table = screen.getByRole('table');
    const theader = screen.getAllByRole('columnheader');

    expect(table).toBeInTheDocument();
    expect(theader[0]).toHaveTextContent('Descrição');
    expect(theader[1]).toHaveTextContent('Tag');
    expect(theader[2]).toHaveTextContent('Método de pagamento');
    expect(theader[3]).toHaveTextContent('Valor');
    expect(theader[4]).toHaveTextContent('Moeda');
    expect(theader[5]).toHaveTextContent('Câmbio utilizado');
    expect(theader[6]).toHaveTextContent('Valor convertido');
    expect(theader[7]).toHaveTextContent('Moeda de conversão');
    expect(theader[8]).toHaveTextContent('Editar/Excluir');
  });

  it('Testa se o ao clicar no botão adicionar despesa, a despesa é adicionada', async () => {
    const { store } = renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'] });

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledTimes(1);
      expect(global.fetch).toHaveBeenCalledWith(URL);
      expect(store.getState().wallet.currencies).toHaveLength(15);
    });

    const value = screen.getByRole('spinbutton', { name: /valor/i });
    const description = screen.getByRole('textbox', { name: /descrição da despesa/i });
    const currency = screen.getByRole('combobox', { name: /moeda/i });
    const method = screen.getByRole('combobox', { name: /método de pagamento/i });
    const tag = screen.getByRole('combobox', { name: /categoria da despesa/i });
    const button = screen.getByRole('button', { name: /adicionar despesa/i });

    userEvent.type(value, '10');
    userEvent.type(description, 'Teste');

    userEvent.selectOptions(currency, 'CAD');

    userEvent.selectOptions(method, CARTAO);
    userEvent.selectOptions(tag, 'Lazer');

    userEvent.click(button);

    await waitFor(() => {
      const table = screen.getByRole('table');
      expect(table).toBeInTheDocument();
      const tdElements = document.getElementsByTagName('td');
      expect(tdElements[0]).toHaveTextContent('Teste');
      expect(tdElements[1]).toHaveTextContent('Lazer');
      expect(tdElements[2]).toHaveTextContent(CARTAO);
      expect(tdElements[3]).toHaveTextContent('10');
      expect(tdElements[4]).toHaveTextContent(DOLAR_NAME);
      expect(tdElements[5]).toHaveTextContent('3.76');
      expect(tdElements[6]).toHaveTextContent('37.56');
      expect(tdElements[7]).toHaveTextContent('BRL');
    });
  });

  it('Testa se o botão de deletar despesa funciona', async () => {
    const { store } = renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'] });

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledTimes(1);
      expect(global.fetch).toHaveBeenCalledWith(URL);
      expect(store.getState().wallet.currencies).toHaveLength(15);
    });

    const value = screen.getByRole('spinbutton', { name: /valor/i });
    const description = screen.getByRole('textbox', { name: /descrição da despesa/i });
    const currency = screen.getByRole('combobox', { name: /moeda/i });
    const method = screen.getByRole('combobox', { name: /método de pagamento/i });
    const tag = screen.getByRole('combobox', { name: /categoria da despesa/i });
    const button = screen.getByRole('button', { name: /adicionar despesa/i });

    userEvent.type(value, '10');
    userEvent.type(description, 'Teste');

    userEvent.selectOptions(currency, 'CAD');

    userEvent.selectOptions(method, CARTAO);
    userEvent.selectOptions(tag, 'Lazer');

    userEvent.click(button);

    await waitFor(() => {
      const table = screen.getByRole('table');
      expect(table).toBeInTheDocument();
      const tdElements = document.getElementsByTagName('td');
      expect(tdElements[0]).toHaveTextContent('Teste');
      expect(tdElements[1]).toHaveTextContent('Lazer');
      expect(tdElements[2]).toHaveTextContent(CARTAO);
      expect(tdElements[3]).toHaveTextContent('10');
      expect(tdElements[4]).toHaveTextContent(DOLAR_NAME);
      expect(tdElements[5]).toHaveTextContent('3.76');
      expect(tdElements[6]).toHaveTextContent('37.56');
      expect(tdElements[7]).toHaveTextContent('BRL');
    });

    const deleteButton = screen.getByTestId('delete-btn');
    userEvent.click(deleteButton);
  });

  it('Testa se o botão de editar despesa funciona', async () => {
    const { store } = renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'] });

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledTimes(1);
      expect(global.fetch).toHaveBeenCalledWith(URL);
      expect(store.getState().wallet.currencies).toHaveLength(15);
    });

    const value = screen.getByRole('spinbutton', { name: /valor/i });
    const description = screen.getByRole('textbox', { name: /descrição da despesa/i });
    const currency = screen.getByRole('combobox', { name: /moeda/i });
    const method = screen.getByRole('combobox', { name: /método de pagamento/i });
    const tag = screen.getByRole('combobox', { name: /categoria da despesa/i });
    const button = screen.getByRole('button', { name: /adicionar despesa/i });

    userEvent.type(value, '10');
    userEvent.type(description, 'Teste');

    userEvent.selectOptions(currency, 'CAD');

    userEvent.selectOptions(method, CARTAO);
    userEvent.selectOptions(tag, 'Lazer');

    userEvent.click(button);

    await waitFor(() => {
      const table = screen.getByRole('table');
      expect(table).toBeInTheDocument();
      const tdElements = document.getElementsByTagName('td');
      expect(tdElements[0]).toHaveTextContent('Teste');
      expect(tdElements[1]).toHaveTextContent('Lazer');
      expect(tdElements[2]).toHaveTextContent(CARTAO);
      expect(tdElements[3]).toHaveTextContent('10');
      expect(tdElements[4]).toHaveTextContent(DOLAR_NAME);
      expect(tdElements[5]).toHaveTextContent('3.76');
      expect(tdElements[6]).toHaveTextContent('37.56');
      expect(tdElements[7]).toHaveTextContent('BRL');
    });

    const editButton = screen.getByTestId('edit-btn');
    userEvent.click(editButton);

    await waitFor(() => {
      const objetoDaPorra = {
        currency: 'CAD',
        description: 'Teste',
        exchangeRates: { ARS: { ask: '0.0396', bid: '0.0396', code: 'ARS', codein: 'BRL', create_date: '2022-05-30 17:47:45', high: '0.0396', low: '0.0391', name: 'Peso Argentino/Real Brasileiro', pctChange: '0', timestamp: '1653943661', varBid: '0' }, AUD: { ask: '3.4218', bid: '3.4195', code: 'AUD', codein: 'BRL', create_date: '2022-05-30 17:47:44', high: '3.4232', low: '3.3658', name: 'Dólar Australiano/Real Brasileiro', pctChange: '1.33', timestamp: '1653943664', varBid: '0.0448' }, BTC: { ask: '147.235', bid: '146.994', code: 'BTC', codein: 'BRL', create_date: '2022-05-30 17:20:59', high: '147.253', low: '137', name: 'Bitcoin/Real Brasileiro', pctChange: '6.14', timestamp: '1653942059', varBid: '8523' }, CAD: { ask: '3.7559', bid: '3.7552', code: 'CAD', codein: 'BRL', create_date: '2022-05-30 17:47:42', high: '3.7575', low: '3.699', name: 'Dólar Canadense/Real Brasileiro', pctChange: '1.06', timestamp: '1653943661', varBid: '0.0394' }, CHF: { ask: '4.9651', bid: '4.9641', code: 'CHF', codein: 'BRL', create_date: '2022-05-30 17:47:47', high: '4.9667', low: '4.8847', name: 'Franco Suíço/Real Brasileiro', pctChange: '0.49', timestamp: '1653943661', varBid: '0.0241' }, CNY: { ask: '0.7137', bid: '0.7134', code: 'CNY', codein: 'BRL', create_date: '2022-05-30 17:47:02', high: '0.714', low: '0.7037', name: 'Yuan Chinês/Real Brasileiro', pctChange: '1.01', timestamp: '1653943622', varBid: '0.0072' }, DOGE: { ask: '0.412194', bid: '0.412194', code: 'DOGE', codein: 'BRL', create_date: '2022-05-30 17:47:16', high: '0.412416', low: '0.388597', name: 'Dogecoin/Real Brasileiro', pctChange: '6.01', timestamp: '1653943636', varBid: '0.02336' }, ETH: { ask: '9.2621', bid: '9.22226', code: 'ETH', codein: 'BRL', create_date: '2022-05-30 17:20:32', high: '9.26732', low: '6', name: 'Ethereum/Real Brasileiro', pctChange: '8.14', timestamp: '1653942032', varBid: '697.24' }, EUR: { ask: '5.1268', bid: '5.1225', code: 'EUR', codein: 'BRL', create_date: '2022-05-30 17:47:43', high: '5.1278', low: '5.0451', name: 'Euro/Real Brasileiro', pctChange: '1.01', timestamp: '1653943663', varBid: '0.0514' }, GBP: { ask: '6.0174', bid: '6.013', code: 'GBP', codein: 'BRL', create_date: '2022-05-30 17:47:44', high: '6.0195', low: '5.9272', name: 'Libra Esterlina/Real Brasileiro', pctChange: '0.81', timestamp: '1653943664', varBid: '0.0485' }, ILS: { ask: '1.4237', bid: '1.4235', code: 'ILS', codein: 'BRL', create_date: '2022-05-30 17:46:03', high: '1.4274', low: '1.4118', name: 'Novo Shekel Israelense/Real Brasileiro', pctChange: '0.72', timestamp: '1653943563', varBid: '0.0102' }, JPY: { ask: '0.03727', bid: '0.03725', code: 'JPY', codein: 'BRL', create_date: '2022-05-30 17:47:46', high: '0.03729', low: '0.03671', name: 'Iene Japonês/Real Brasileiro', pctChange: '0', timestamp: '1653943661', varBid: '0' }, LTC: { ask: '323.04', bid: '320.89', code: 'LTC', codein: 'BRL', create_date: '2022-05-30 17:20:31', high: '321.9', low: '299.02', name: 'Litecoin/Real Brasileiro', pctChange: '7.2', timestamp: '1653942031', varBid: '21.5' }, USD: { ask: '4.7531', bid: '4.7526', code: 'USD', codein: 'BRL', create_date: '2022-05-30 17:47:41', high: '4.7558', low: '4.6908', name: 'Dólar Americano/Real Brasileiro', pctChange: '0.49', timestamp: '1653943661', varBid: '0.0234' }, XRP: { ask: '1.93', bid: '1.92', code: 'XRP', codein: 'BRL', create_date: '2022-05-30 17:20:33', high: '1.93', low: '1.84', name: 'XRP/Real Brasileiro', pctChange: '4.73', timestamp: '1653942033', varBid: '0.09' } },
        id: 0,
        method: 'Cartão de crédito',
        tag: 'Lazer',
        value: '10',
      };
      expect(store.getState().wallet.editing).toEqual(objetoDaPorra);
    });

    expect(value).toHaveValue(10);
    expect(method).toHaveValue(CARTAO);
    expect(tag).toHaveValue('Lazer');
    expect(description).toHaveValue('Teste');

    const buttonEdit = screen.getByRole('button', { name: /editar despesa/i });
    userEvent.click(buttonEdit);
  });

  it('retorna o objeto correto na expense', () => {
    // maneira mais facil de testar a linha 45 do reducer wallet.js
    // mockar um estado com as informações e enviar para o reducer
    const state = {
      editor: true,
      expenses: [{ id: 1, name: 'Expense 1', amount: 10 }, { id: 2, name: 'Expense 2', amount: 20 }],
      idToEdit: 1,
    };

    const action = {
      type: EDITED_EXPENSE,
      payload: {
        editor: false,
        data: { name: 'Expense 1 (edited)', amount: 15 },
      },
    };

    // Envia a ação para o meu reducer para que ele retorne o novo estado
    const result = wallet(state, action);
    expect(result.expenses[0]).toEqual({ id: 1, name: 'Expense 1 (edited)', amount: 15 });
  });
});
