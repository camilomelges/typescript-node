import React, { Component } from 'react';
import twitterLogo from '../twitter.svg';
import './Timeline.css';
import socket from 'socket.io-client';
import api from '../services/api';
import Tweet from '../components/Tweet';
// import { Container } from './styles';

export default class Timeline extends Component {
  state = {
    tweets: [],
    newTweet: ''
  };

  async getTweets() {
    await api({
      method: 'get',
      url: '/tweets',
      headers: {
        authorization: 'Bearer ' + localStorage.getItem('@user:token'),
        'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'
      }
    }).then(function (res) {
      this.setState({ tweets: [res.data, ...this.state.tweets] });
    })
    .catch(function (err) {
      console.log(err.message);
    });
  }

  async componentDidMount() {
    this.subscribeToEvents();
    const response = await api.get('tweets');
    
    this.setState({ tweets: response.data });
  }

  subscribeToEvents = () => {
    const io = socket('http://localhost:3000');

    io.on('new_tweet', data => {
      this.setState({ tweets: [data, ...this.state.tweets] });
    });

    io.on('like_tweet', data => {
      this.setState({ tweets: this.state.tweets.map(tweet => 
          tweet._id === data._id ? data : tweet
        )})
    });
  }

  handleInputChange = e => {
    this.setState({ newTweet: e.target.value })
  };

  handleNewTweet = async e => {
    if (e.keyCode !== 13) return;

    const content = this.state.newTweet;
    const author = localStorage.getItem('@user:username');

    await api.post('tweets', { content, author });
    
    this.setState({ newTweet: '' });
  };

  render() {
    this.getTweets();
    return (
      <div className="timeline-wrapper">
        <img src={twitterLogo} height={24} alt="user"/>

        <form>
          <textarea 
            value={this.state.newTweet}
            onChange={this.handleInputChange}
            onKeyDown={this.handleNewTweet}
            placeholder="O que está acontecendo?">
          </textarea>
        </form>
        <ul className="tweet-list">
        {this.state.tweets.map(tweet => (
          <Tweet key={tweet._id} tweet={tweet} />
        ))}
        </ul>
      </div>
    )
  }
}
