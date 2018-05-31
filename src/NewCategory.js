import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';


class NewCategory extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
    };

    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleRedirect = this.handleRedirect.bind(this);
  }

  handleSubmit(event) {
    console.log('WE HANDLING SUBMIT');
    event.preventDefault();
    const url = 'http://localhost:5000/catalog/';
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: this.state.name,
      }),
    }).then(this.handleRedirect);
  }

  handleRedirect(result) {
    if (result.status === 200) {
      console.log('WE HANDLING REDIRECT');
      const url = '/catalog';
      this.props.history.push(url);
    }
  }

  handleNameChange(event) {
    console.log('WE HANDLING A NAME CHANGE');
    this.setState({ name: event.target.value });
  }


  render() {
    return (
      <div>
        <h2>New Category</h2>
        <form onSubmit={this.handleSubmit}>
          <input type="text" name="name" value={this.state.name} onChange={this.handleNameChange} />
          <input type="submit" value="submit" />
        </form>
        <NavLink to="/catalog">Cancel</NavLink>
      </div>
    );
  }
}

export default NewCategory;
