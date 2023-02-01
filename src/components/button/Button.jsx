import PropTypes from 'prop-types';
import React, { Component } from 'react';

export default class Button extends Component {
  render() {
    const { type, text, testId, disabled } = this.props;
    return (
      <button
        type={ type }
        data-testid={ testId }
        disabled={ disabled }
      >
        {text}
      </button>
    );
  }
}

Button.propTypes = {
  testId: PropTypes.string,
  text: PropTypes.string,
  type: PropTypes.string,
  disabled: PropTypes.bool,
}.isRequired;
