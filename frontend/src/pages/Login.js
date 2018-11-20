import React, { Component } from 'react';
import twitterLogo from '../twitter.svg';
import api from '../services/api';
import './Login.css';
// import { Container } from './styles';

export default class Login extends Component {
  state = {
    username: '',
    password: ''
  };

  changeUserName = e => {
    this.setState({ username: e.target.value });
  };

  changePassword = e => {
    this.setState({ password: e.target.value });
  };

  submitForm = async e => {
    e.preventDefault();
    
    const { username, password } = this.state;

    if (!username.length) return alert('E-mail obrigatório!');
    if (!password.length) return alert('A senha obrigatória!');

    localStorage.setItem('@user:username', username);
    localStorage.setItem('@user:password', password);

    await api({
      method: 'post',
      url: '/login',
      data: {
        email: username,
        password: password
      }
    }).then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });

    return;
    
    this.props.history.push('/timeline');
  };
  
  render() {
    return (
        <div className="login-wrapper">
          <img src={twitterLogo} alt="user"/>
            <form onSubmit={this.submitForm}>
              <input 
                value={this.state.username}
                onChange={this.changeUserName}
                required
                placeholder="E-mail"/>
                <input 
                value={this.state.password}
                onChange={this.changePassword}
                required
                placeholder="Senha"/>
              <button type="submit">Entrar</button>
              <small><a href='/register'>Não sou cadastrado</a></small>
            </form>
        </div>
    );
  }
}
