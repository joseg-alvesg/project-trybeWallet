import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import Wallet from '../pages/Wallet';
import { renderWithRouterAndRedux } from './helpers/renderWith';

describe('Teste da cobertura do componente wallet', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: () => mockData,
    });
  });

  it('teste do email e totalfield dentro do header', async () => {
    const { history } = renderWithRouterAndRedux(<App />);
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
    });

    const totalField = screen.getByTestId('total-field');
    expect(totalField).toBeInTheDocument();
    expect(totalField).toHaveTextContent('0');

    const emailSpan = screen.getByText('test@test.com');
    expect(emailSpan).toBeInTheDocument();
  });

  it('Testa os inputs do documento walletForm', () => {
    renderWithRouterAndRedux(<Wallet />);
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
    waitFor(() => {
      expect(currency).toHaveValue('BRL');
    });
    expect(method).toHaveValue('Dinheiro');
    expect(tag).toHaveValue('Alimentação');

    userEvent.type(value, '10');
    userEvent.type(description, 'Teste');
    waitFor(() => {
      userEvent.selectOptions(currency, 'CAD');
    });
    userEvent.selectOptions(method, 'Cartão de crédito');
    userEvent.selectOptions(tag, 'Lazer');

    userEvent.click(button);
  });

  it('Testa as se os componentes da tabela existem', () => {
    renderWithRouterAndRedux(<Wallet />);
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

  it('Testa se o ao clicar no botão adicionar despesa, a despesa é adicionada', () => {
    renderWithRouterAndRedux(<Wallet />);
    const value = screen.getByRole('spinbutton', { name: /valor/i });
    const description = screen.getByRole('textbox', { name: /descrição da despesa/i });
    const currency = screen.getByRole('combobox', { name: /moeda/i });
    const method = screen.getByRole('combobox', { name: /método de pagamento/i });
    const tag = screen.getByRole('combobox', { name: /categoria da despesa/i });
    const button = screen.getByRole('button', { name: /adicionar despesa/i });

    userEvent.type(value, '10');
    userEvent.type(description, 'Teste');
    waitFor(() => {
      userEvent.selectOptions(currency, 'CAD');
    });
    userEvent.selectOptions(method, 'Cartão de crédito');
    userEvent.selectOptions(tag, 'Lazer');

    userEvent.click(button);

    waitFor(() => {
      const table = screen.getByRole('table');
      expect(table).toBeInTheDocument();
      const tdElements = document.getElementsByTagName('td');
      expect(tdElements[0]).toHaveTextContent('Teste');
      expect(tdElements[1]).toHaveTextContent('Lazer');
      expect(tdElements[2]).toHaveTextContent('Cartão de crédito');
      expect(tdElements[3]).toHaveTextContent('10');
      expect(tdElements[4]).toHaveTextContent('CAD');
      expect(tdElements[5]).toHaveTextContent('1.5');
      expect(tdElements[6]).toHaveTextContent('15');
      expect(tdElements[7]).toHaveTextContent('BRL');
    });
  });

  it('Testa se o botão de deletar funciona', () => {

  });
});
