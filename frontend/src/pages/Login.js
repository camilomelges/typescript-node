import React, { Component } from 'react';
import twitterLogo from '../twitter.svg';
import api from '../services/api';
import './Login.css';
// import { Container } from './styles';

export default class Login extends Component {
  state = {
    email: '',
    passWord: ''
  };

  changeEmail = e => {
    this.setState({ email: e.target.value });
  };

  changePassword = e => {
    this.setState({ passWord: e.target.value });
  };

  submitForm = async e => {
    e.preventDefault();
    
    const { email, passWord } = this.state;

    if (!email.length) return alert('E-mail obrigatório!');
    if (!passWord.length) return alert('A senha obrigatória!');

    localStorage.setItem('@user:email', email);
    localStorage.setItem('@user:password', passWord);

    await api({
      method: 'post',
      url: '/login',
      data: {
        user: this.state
      }
    }).then(res => {
        localStorage.setItem('@user:token', res.data.token);
        return this.props.history.push('/timeline');
    })
    .catch(err => {
      return alert(err.response.data.message);
    });

    // await api({
    //   method: 'post',
    //   url: '/register',
    //   data: {
    //     user: this.state
    //   }
    // }).then(function (res) {
    //   localStorage.setItem('@user:token', res.data.token);
    //   return this.props.history.push('/timeline');
    // })
    // .catch(function (err) {
    //   return alert('Não foi possível efetuar seu cadastro!')
    // });
  };
  
  render() {
    return (
        <div className="login-wrapper">
          <img src={twitterLogo} alt="user"/>
            <form onSubmit={this.submitForm}>
              <input 
                value={this.state.username}
                onChange={this.changeEmail}
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
