import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';


class NewCategory extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      error: '',
    };

    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleRedirect = this.handleRedirect.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    const url = `http://${localStorage.getItem('address')}/catalog/`;
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
      const url = '/catalog';
      this.props.history.push(url);
    } else if (result.status === 409) {
      this.setState({ error: 'CATEGORY NAME MUST BE UNIQUE' });
    } else if (result.status === 400) {
      this.setState({ error: 'CATEGORY NAME CANNOT BE EMPTY' });
    }
  }

  handleNameChange(event) {
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
        <div className="row">
          { this.state.error !== '' ? (
            <div className="alert alert-danger col-md-6">
              <strong>{this.state.error}</strong>
            </div>) : '' }
        </div>
      </div>
    );
  }
}

export default NewCategory;
