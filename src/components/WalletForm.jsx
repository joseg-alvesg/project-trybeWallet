import React, { Component } from 'react';
import Header from './Header';
import styles from './styles/WalletForm.module.css';

class WalletForm extends Component {
  render() {
    return (
      <div className={ styles.walletForm }>
        <Header />
        <form action="">
          form
        </form>
        <button>Adicionar despesas</button>
      </div>
    );
  }
}

export default WalletForm;
