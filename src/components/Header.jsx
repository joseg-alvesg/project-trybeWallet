import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import logo from '../images/group1.svg';
import styles from './styles/Header.module.css';
import despesa from '../images/despesa.svg';
import imgIcon from '../images/imgIcon.svg';

class Header extends Component {
  render() {
    const { email, expenses } = this.props;
    const sum = expenses.reduce((acc, { currency, exchangeRates, value }) => acc
      + (Number(exchangeRates[currency].ask) * Number(value)), 0);

    return (
      <div className={ styles.header }>
        <img src={ logo } alt="logo" className={ styles.logo } />
        <p>
          <img src={ despesa } alt="despesas" />
          Total de despesas:
          <span data-testid="total-field">
            {sum.toFixed(2)}
          </span>
          <span data-testid="header-currency-field">BRL</span>
        </p>
        <p data-testid="email-field">
          <img src={ imgIcon } alt="emailImage" />
          <span>{email}</span>

        </p>
      </div>
    );
  }
}

Header.propTypes = {
  email: PropTypes.string,
  value: PropTypes.string,
}.isRequired;

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(Header);
