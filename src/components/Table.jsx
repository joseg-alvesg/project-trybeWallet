import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import styles from './styles/table.module.css';

class Table extends Component {
  render() {
    const { expenses } = this.props;
    let exchange = {};
    expenses.forEach((expense) => {
      const exchangeRates = Object.entries(expense.exchangeRates);
      const one = exchangeRates.filter((rate) => expense.currency === rate[0]);
      exchange = { ...one[0][1] };
    });
    console.log(exchange);
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

          <tbody>
            {expenses.map((elem) => (
              <tr key={ elem.id }>
                <td>{elem.description}</td>
                <td>{elem.tag}</td>
                <td>{elem.method}</td>
                <td>{elem.value}</td>
                <td>{elem.currency}</td>
                <td>{}</td>
                <td>convertido</td>
                <td>BRL</td>
                <td>
                  <button>editar</button>
                  <button>exccluir</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

Table.propTypes = {
  expenses: PropTypes.shape({
    forEach: PropTypes.func,
    map: PropTypes.func,
  }),
}.isRequired;

const mapStateToProps = ({ wallet }) => ({
  expenses: wallet.expenses,
});

export default connect(mapStateToProps)(Table);
