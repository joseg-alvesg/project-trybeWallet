import PropTypes from 'prop-types';
import React, { Component } from 'react';

export default class Input extends Component {
  render() {
    const { type, testId, name, id, placeHolder, onchange, value } = this.props;
    return (
      <input
        type={ type }
        name={ name }
        placeholder={ placeHolder }
        id={ id }
        data-testid={ testId }
        onChange={ onchange }
        value={ value }
      />
    );
  }
}

Input.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  testId: PropTypes.string,
  type: PropTypes.string,
  placeHolder: PropTypes.string,
  onchange: PropTypes.func,
  value: PropTypes.string,
}.isRequired;
