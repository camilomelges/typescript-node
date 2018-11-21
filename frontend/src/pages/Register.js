import React, { Component } from 'react';
import twitterLogo from '../twitter.svg';
import api from '../services/api';
import './Login.css';
// import { Container } from './styles';

export default class Login extends Component {
  state = {
    email: '',
    passWord: '',
    firstName: '',
    lastName: '',
    phone: ''
  };

  changeEmail = e => {
    this.setState({ email: e.target.value });
  };
  
  changeFirstName = e => {
    this.setState({ firstName: e.target.value });
  };

  changeLastName = e => {
    this.setState({ lastName: e.target.value });
  };

  changePhone = e => {
    this.setState({ phone: e.target.value });
  };

  changePassword = e => {
    this.setState({ passWord: e.target.value });
  };

  submitForm = async e => {
    e.preventDefault();
    
    const { email, passWord, firstName, lastName } = this.state;

    if (!email.length) return alert('E-mail obrigatório!');
    if (!passWord.length) return alert('A senha obrigatória!');

    localStorage.setItem('@user:email', email);
    localStorage.setItem('@user:password', passWord);
    localStorage.setItem('@user:firstName', firstName);
    localStorage.setItem('@user:lastName', lastName);

    await api({
      method: 'post',
      url: '/register',
      data: {
        user: this.state
      }
    }).then(function (res) {
      localStorage.setItem('@user:token', res.data.token);
      return this.props.history.push('/timeline');
    })
    .catch(function (err) {
      return alert('Não foi possível efetuar seu cadastro!')
    });
  };
  
  render() {
    return (
        <div className="login-wrapper">
          <img src={twitterLogo} alt="user"/>
            <form onSubmit={this.submitForm}>
              <input 
                value={this.state.firstName}
                onChange={this.changeFirstName}
                required
                placeholder="Nome"/>
              <input 
                value={this.state.lastName}
                onChange={this.changeLastName}
                required
                placeholder="Sobrenome"/>
              <input 
                value={this.state.email}
                onChange={this.changeEmail}
                required
                placeholder="E-mail"/>
              <input 
                value={this.state.phone}
                onChange={this.changePhone}
                placeholder="Celular"/>
              <input 
                value={this.state.password}
                onChange={this.changePassword}
                required
                placeholder="Senha"/>
              <button type="submit">Registrar</button>
            </form>
        </div>
    );
  }
}
