import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { del } from '../assets/request';

class DeleteItem extends Component {
  state = {
    error: '',
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const url = `/catalog/${this.props.match.params.category}/${this.props.match.params.item}`;
    del(url).then(this.handleRedirect);
  }

  handleRedirect = (result) => {
    if (result.status === 200) {
      const url = `/catalog/${this.props.match.params.category}`;
      this.props.history.push(url);
    } else if (result.status === 401) {
      this.setState({ error: 'UNAUTHORIZED DELETE' });
    }
  }


  render() {
    const { item } = this.props.match.params;
    return (
      <div>
        <h2>Are you sure you want to delete {item}</h2>
        <form onSubmit={this.handleSubmit}>
          <input type="submit" value="Yes" />
        </form> <br />
        <NavLink to={`/catalog/${this.props.match.params.category}/${this.props.match.params.item}`}>Cancel</NavLink>
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

export default DeleteItem;
