import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { actionCoin } from '../redux/actions/walletAction';
import Header from './Header';
import styles from './styles/WalletForm.module.css';

class WalletForm extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    console.log(dispatch(actionCoin()));
  }

  render() {
    const { currencies } = this.props;
    // const { currencies } = this.state;
    return (
      <div className={ styles.walletForm }>
        <Header />
        <form className={ styles.formContainer }>
          <label htmlFor="despesa">
            Valor
            <input
              type="number"
              name="valor"
              // value={ valor }
              // onChange
              data-testid="value-input"
            />
          </label>
          <label htmlFor="category">
            Categoria da despesa
            <select
              name="category"
              id="category"
              data-testid="tag-input"
            >
              <option value="">Alimentação</option>
              <option value="">Lazer</option>
              <option value="">Trabalho</option>
              <option value="">Transporte</option>
              <option value="">Saúde</option>
            </select>
          </label>
          <label htmlFor="description">
            Descrição da despesa
            <input
              type="text"
              name="dercription"
              // value={ description }
              // onChange
              data-testid="description-input"
            />
          </label>
          <label htmlFor="payment" data-testid="method-input">
            Método de pagamento
            <select name="paymento" id="payment" data-testid="method-input">
              <option value="">Dinheiro</option>
              <option value="">Cartão de crédito</option>
              <option value="">Cartão de débito</option>
            </select>
          </label>
          <label htmlFor="coin">
            Moeda
            <select name="coin" id="coin" data-testid="currency-input">
              {currencies.map((currencie) => (
                <option key={ currencie } value="">{currencie}</option>
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
