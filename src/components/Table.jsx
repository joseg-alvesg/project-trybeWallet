import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { actionDelete, actionEdit } from '../redux/actions/walletAction';
import styles from './styles/table.module.css';
import TableCard from './TableCard';

class Table extends Component {
  deleteButton = ({ target: { id } }) => {
    const { dispatch } = this.props;
    dispatch(actionDelete(id));
  };

  editBtn = (data) => {
    const { dispatch } = this.props;
    dispatch(actionEdit(data));
  };

  render() {
    const { expenses } = this.props;

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
              <TableCard
                key={ elem.id }
                expense={ elem }
                deleteButton={ this.deleteButton }
                editBtn={ this.editBtn }
              />
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
