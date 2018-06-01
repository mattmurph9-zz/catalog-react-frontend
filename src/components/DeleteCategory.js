import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { del } from '../assets/request';


class DeleteCategory extends Component {
  state = {
    error: '',
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const url = `/catalog/${this.props.match.params.category}`;
    del(url).then(this.handleRedirect);
  }

  handleRedirect = (result) => {
    if (result.status === 200) {
      const url = '/catalog/';
      this.props.history.push(url);
    } else {
      this.setState({ error: 'UNAUTHORIZED DELETE' });
    }
  }

  render() {
    return (
      <div>
        <h2>Delete Category {this.props.match.params.category}</h2>
        <form onSubmit={this.handleSubmit}>
          <input type="submit" value="Yes" />
        </form>
        <NavLink to={`/catalog/${this.props.match.params.category}`}>Cancel</NavLink>
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

export default DeleteCategory;
