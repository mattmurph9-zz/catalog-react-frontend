import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { post } from '../assets/request';


class NewCategory extends Component {
  state = {
    name: '',
    error: '',
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const url = '/catalog/';
    const content = JSON.stringify({ name: this.state.name });
    post(url, content).then(this.handleRedirect);
  }

  handleRedirect = (result) => {
    if (result.status === 200) {
      const url = '/catalog';
      this.props.history.push(url);
    } else if (result.status === 409) {
      this.setState({ error: 'CATEGORY NAME MUST BE UNIQUE' });
    } else if (result.status === 400) {
      this.setState({ error: 'CATEGORY NAME CANNOT BE EMPTY' });
    }
  }

  handleNameChange = (event) => {
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
