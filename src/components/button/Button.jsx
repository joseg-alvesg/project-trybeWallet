import PropTypes from 'prop-types';
import React, { Component } from 'react';

export default class Button extends Component {
  render() {
    const { type, text, testId } = this.props;
    return (
      <button
        type={ type }
        data-testid={ testId }
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
}.isRequired;
