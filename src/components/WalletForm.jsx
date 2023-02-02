import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { actionCoin } from '../redux/actions/walletAction';
import Header from './Header';
import styles from './styles/WalletForm.module.css';

class WalletForm extends Component {
  state = {
    category: '',
    valor: '0',
    description: '',
    coin: '',
    payment: '',
    currencies: '',
  };

  componentDidMount() {
    const { dispatch } = this.props;
    console.log(dispatch(actionCoin()));
  }

  handleChange = ({ target: { value, name } }) => {
    this.setState({ [name]: value });
  };

  render() {
    const { currencies } = this.props;
    const { category, valor, description, coin, payment } = this.state;
    console.log(category, valor, description, coin, payment);
    return (
      <div className={ styles.walletForm }>
        <Header />
        <form className={ styles.formContainer }>
          <label htmlFor="valor">
            Valor
            <input
              type="number"
              name="valor"
              value={ valor }
              onChange={ this.handleChange }
              data-testid="value-input"
            />
          </label>
          <label htmlFor="category">
            Categoria da despesa
            <select
              onChange={ this.handleChange }
              name="category"
              id="category"
              data-testid="tag-input"
            >
              <option value="Alimentação">Alimentação</option>
              <option value="Lazer">Lazer</option>
              <option value="Trabalho">Trabalho</option>
              <option value="Transporte">Transporte</option>
              <option value="Saúde">Saúde</option>
            </select>
          </label>
          <label htmlFor="description">
            Descrição da despesa
            <input
              onChange={ this.handleChange }
              type="text"
              name="description"
              id="description"
              value={ description }
              data-testid="description-input"
            />
          </label>
          <label htmlFor="payment" data-testid="method-input">
            Método de pagamento
            <select
              name="payment"
              id="payment"
              data-testid="method-input"
              onChange={ this.handleChange }
            >
              <option value="Dinheiro">Dinheiro</option>
              <option value="Cartão de crédito">Cartão de crédito</option>
              <option value="Cartão de débito">Cartão de débito</option>
            </select>
          </label>
          <label htmlFor="coin">
            Moeda
            <select
              name="coin"
              id="coin"
              data-testid="currency-input"
              onChange={ this.handleChange }
            >
              {currencies.map((currencie) => (
                <option key={ currencie } value={ currencie }>{currencie}</option>
              ))}
            </select>
          </label>
        </form>
        <button>Adicionar despesas</button>
      </div>
    );
  }
}

WalletForm.propTypes = {
  currencies: PropTypes.shape({
    map: PropTypes.func,
  }),
  dispatch: PropTypes.func,
}.isRequired;

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});

export default connect(mapStateToProps)(WalletForm);
