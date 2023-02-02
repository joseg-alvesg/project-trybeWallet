import React from 'react';
import WalletForm from '../components/WalletForm';
import styles from './styles/wallet.module.css';

class Wallet extends React.Component {
  render() {
    return (
      <div className={ styles.wallet }>
        <WalletForm />
        carteira
      </div>
    );
  }
}

export default Wallet;
