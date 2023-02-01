import PropTypes from 'prop-types';
import React, { Component } from 'react';

export default class Input extends Component {
  render() {
    const { type, testId, name, id, placeHolder } = this.props;
    return (
      <input
        type={ type }
        name={ name }
        placeholder={ placeHolder }
        id={ id }
        data-testid={ testId }
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
}.isRequired;
