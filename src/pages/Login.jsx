import React from 'react';
import Button from '../components/button/Button';
import Input from '../components/input/Input';

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
    console.log(isDisable);

    this.setState({ isDisable });
  };

  render() {
    const { isDisable, email, passwd } = this.state;
    return (
      <form>
        <Input
          type="email"
          id="email"
          name="email"
          placeHolder="E-mail"
          testId="email-input"
          onchange={ this.onChange }
          value={ email }
        />
        <Input
          type="password"
          id="passwd"
          name="passwd"
          placeHolder="Senha"
          testId="password-input"
          onchange={ this.onChange }
          value={ passwd }
        />
        <Button text="Entrar" type="button" disabled={ isDisable } />
      </form>
    );
  }
}

export default Login;
