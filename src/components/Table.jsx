import React, { Component } from 'react';
import styles from './styles/table.module.css';

class Table extends Component {
  render() {
    return (
      <div className={ styles.container }>
        <table className={ styles.table }>
          <thead>
            <tr>
              <th>Descrição</th>
              <th>Tag</th>
              <th>Método de pagamento</th>
              <th>Valor</th>
              <th>Moeda</th>
              <th>Câmbio utilizado</th>
              <th>Valor convertido</th>
              <th>Moeda de conversão</th>
              <th>Editar/Excluir</th>
            </tr>
          </thead>
          <hr />

          <tbody />
        </table>
      </div>
    );
  }
}

export default Table;
