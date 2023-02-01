import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { userEmail } from '../redux/actions';

// start

const MIN_PASSWD = 5;
class Login extends React.Component {
  state = {
    email: '',
    passwd: '',
    isDisable: true,
  };

  onChange = ({ target: { value, name } }) => {
    this.setState({ [name]: value }, this.verify);
  };

  verify = () => {
    const { email, passwd } = this.state;
    const regexEmail = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+\)?$/i;
    const passwdverify = passwd.length > MIN_PASSWD;

    const isDisable = !(regexEmail.test(email) && passwdverify);
    this.setState({ isDisable });
  };

  onClick = () => {
    const { dispatch, history } = this.props;
    const { email, passwd } = this.state;
    dispatch(userEmail(email, passwd));
    history.push('/carteira');
  };

  render() {
    const { isDisable, email, passwd } = this.state;
    return (
      <form>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="E-mail"
          data-testid="email-input"
          onChange={ this.onChange }
          value={ email }
        />
        <input
          type="password"
          id="passwd"
          name="passwd"
          placeholder="Senha"
          data-testid="password-input"
          onChange={ this.onChange }
          value={ passwd }
        />
        <button
          type="button"
          disabled={ isDisable }
          onClick={ this.onClick }
        >
          Entrar
        </button>
      </form>
    );
  }
}

Login.propTypes = {
  dispatch: PropTypes.func,
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}.isRequired;

export default connect()(Login);
