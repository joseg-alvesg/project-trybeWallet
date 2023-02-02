import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { actionCoin, actionExpense } from '../redux/actions/walletAction';
import Header from './Header';
import styles from './styles/WalletForm.module.css';

const INITIAL_LOCAL_STATE = {
  tag: '',
  value: '',
  description: '',
  currency: 'USD',
  method: '',
};

class WalletForm extends Component {
  state = {
    ...INITIAL_LOCAL_STATE,
  };

  componentDidMount() {
    const { dispatch } = this.props;
    console.log(dispatch(actionCoin()));
  }

  handleChange = ({ target: { value, name } }) => {
    this.setState({ [name]: value });
  };

  handleClick = () => {
    const { dispatch } = this.props;
    const { ...state } = this.state;

    dispatch(actionExpense({ ...state }));
    this.setState({ ...INITIAL_LOCAL_STATE });
  };

  render() {
    const { currencies } = this.props;
    const { tag, value, description, currency, method } = this.state;
    console.log(tag, value, description, currency, method);
    return (
      <div className={ styles.walletForm }>
        <Header />
        <form className={ styles.formContainer }>
          <label htmlFor="value">
            Valor
            <input
              type="number"
              name="value"
              value={ value }
              onChange={ this.handleChange }
              data-testid="value-input"
            />
          </label>
          <label htmlFor="tag">
            Categoria da despesa
            <select
              onChange={ this.handleChange }
              name="tag"
              id="tag"
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
          <label htmlFor="method">
            Método de pagamento
            <select
              name="method"
              id="method"
              data-testid="method-input"
              onChange={ this.handleChange }
            >
              <option value="Dinheiro">Dinheiro</option>
              <option value="Cartão de crédito">Cartão de crédito</option>
              <option value="Cartão de débito">Cartão de débito</option>
            </select>
          </label>
          <label htmlFor="currency">
            Moeda
            <select
              name="currency"
              id="currency"
              data-testid="currency-input"
              onChange={ this.handleChange }
            >
              {currencies.map((currencie) => (
                <option key={ currencie } value={ currencie }>{currencie}</option>
              ))}
            </select>
          </label>
        </form>
        <button onClick={ this.handleClick }>Adicionar despesas</button>
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
