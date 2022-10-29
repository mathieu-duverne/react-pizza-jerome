import React from 'react';
import axios from 'axios';

export default class PersonAdd extends React.Component {
  state = {
    username: '',
    email: '',
    password: '',
  }

  handleChange = event => {
    this.setState({ username: event.target.value });
  }

  handleChangeEmail = event => {
    this.setState({email: event.target.value});
  }

  handleChangePassword = event => {
    this.setState({password: event.target.value});
  }

  handleSubmit = event => {
    event.preventDefault();


    const user = {
      username: this.state.username,
      email: this.state.email,
      password: this.state.password
    };

      axios.post('http://localhost:1337/api/auth/local/register',
    {
        username: user.username,
        email: user.email,
        password: user.password
      
    }
    )
    .then(response => {
      console.log(response);
    });
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>
            Person Name:
            <input type="text" name="username" onChange={this.handleChange} />
            <input type="email" name="email" onChange={this.handleChangeEmail} />
            <input type="password" name="password" onChange={this.handleChangePassword} />
          </label>
          <button type="submit">Add</button>
        </form>
      </div>
    )
  }
}