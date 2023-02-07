import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import App from '../App';

describe('Testes da página de login', () => {
  it('Teste do imput de email e senha e habilitação do botão', () => {
    renderWithRouterAndRedux(<App />);
    const email = screen.getByTestId('email-input');
    const password = screen.getByTestId('password-input');
    const button = screen.getByRole('button', { name: /entrar/i });

    expect(email).toBeInTheDocument();
    expect(password).toBeInTheDocument();
    expect(button).toBeInTheDocument();
    expect(button).toBeDisabled();
  });

  it('Testa digitação nos inputs e se o botão é habilitado e após clicado redirecionado para /carteira', async () => {
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

    expect(button).not.toBeDisabled();

    userEvent.click(button);

    expect(history.location.pathname).toBe('/carteira');
  });
});
