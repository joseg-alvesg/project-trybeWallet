import React from 'react';
import Table from '../components/Table';
import WalletForm from '../components/WalletForm';
import styles from './styles/wallet.module.css';

class Wallet extends React.Component {
  render() {
    return (
      <div className={ styles.wallet }>
        <WalletForm />
        <Table />
      </div>
    );
  }
}

export default Wallet;
