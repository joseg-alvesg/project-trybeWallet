import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import logo from '../images/group1.svg';
import styles from './styles/Header.module.css';
import despesa from '../images/despesa.svg';
import imgIcon from '../images/imgIcon.svg';

class Header extends Component {
  render() {
    const { email } = this.props;
    return (
      <div className={ styles.header }>
        <img src={ logo } alt="logo" className={ styles.logo } />
        <p>
          <img src={ despesa } alt="despesas" />
          Total de despesas:
          <span data-testid="total-field">
            0
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
}.isRequired;

const mapStateToProps = (state) => ({
  email: state.user.email,
});

export default connect(mapStateToProps)(Header);
