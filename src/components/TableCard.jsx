import PropTypes from 'prop-types';
import React, { Component } from 'react';
import trash from '../images/trashBtn.svg';
import edit from '../images/editBtn.svg';

export default class TableCard extends Component {
  render() {
    const { expense, deleteButton, editBtn } = this.props;
    console.log(expense);
    return (
      <tr key={ expense.id }>
        <td>{expense.description}</td>
        <td>{expense.tag}</td>
        <td>{expense.method}</td>
        <td>{Number(expense.value).toFixed(2)}</td>
        <td>{expense.exchangeRates[expense.currency].name}</td>
        <td>{Number(expense.exchangeRates[expense.currency].ask).toFixed(2)}</td>
        <td>
          {Number(expense.exchangeRates[expense
            .currency].ask * expense.value).toFixed(2)}
        </td>
        <td>{expense.exchangeRates[expense.currency].codein}</td>
        <td>
          <button
            data-testid="edit-btn"
            onClick={ () => editBtn(expense) }
          >
            <img src={ edit } alt="edit" />
          </button>
          <button
            id={ expense.id }
            data-testid="delete-btn"
            onClick={ deleteButton }
          >
            <img id={ expense.id } src={ trash } alt="trash" />
          </button>
        </td>
      </tr>
    );
  }
}

TableCard.propTypes = {
  deleteButton: PropTypes.func,
  editBtn: PropTypes.func,
  expense: PropTypes.shape({
    currency: PropTypes.string,
    description: PropTypes.string,
    exchangeRates: PropTypes.string,
    id: PropTypes.string,
    method: PropTypes.string,
    tag: PropTypes.string,
    value: PropTypes.string,
  }),
}.isRequired;
