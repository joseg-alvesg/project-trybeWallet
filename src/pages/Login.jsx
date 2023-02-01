import React from 'react';
import Button from '../components/button/Button';
import Input from '../components/input/Input';

// start
class Login extends React.Component {
  render() {
    return (
      <form>
        <Input
          type="email"
          id="email"
          name="email"
          placeHolder="E-mail"
          testId="email-input"
        />
        <Input
          type="password"
          id="passwd"
          name="passwd"
          placeHolder="Senha"
          testId="password-input"
        />
        <Button text="Entrar" type="button" />
      </form>
    );
  }
}

export default Login;
