/** @jsx React.DOM */

var getPosts = require('./posts');
var getUser = require('./profile');
global.React = require('react');

var updateState = function(results) {
    this.setState(results);
  };

var Profile = React.createClass({
  getInitialState: function () {
    return {
      avatar_url: '',
      name: 'loading..',
      email: 'loading..',
      location: 'loading..'
    };
  },
  componentDidMount: function () {
    getUser.then(updateState.bind(this));
  },
  render: function () {
    return (
      <div className="profile">
        <img src={this.state.avatar_url} alt="Profile Picture"/>
        <ul>
          <li>{this.state.name}</li>
          <li>{this.state.email}</li>
          <li>{this.state.location}</li>
        </ul>
      </div>
    );
  }
});

var Posts = React.createClass({
  getInitialState: function () {
    return {
      posts: []
    };
  },
  componentDidMount: function () {
    getPosts.then(function(results) {
      this.setState({
        posts: results
      });
    }.bind(this));
  },
  render: function () {
    var posts = this.state.posts.map(function(post) {
      return (
        <div key={ post.sha }>
          <h1>{ post.title }</h1>
          <small>{ post.date }</small>
        </div>
      );
    });

    return (
      <div className="posts">
        { posts }
      </div>
    );
  }
});

React.renderComponent(
  <div>
    <Posts />
    <Profile />
  </div>,
  document.body
);

