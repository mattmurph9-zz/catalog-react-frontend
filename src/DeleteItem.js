import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

class DeleteItem extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      error: '',
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleRedirect = this.handleRedirect.bind(this);
  }

  componentDidMount() {
    this.setState({ name: this.props.match.params.item });
  }

  handleSubmit(event) {
    event.preventDefault();
    const url = `http://localhost:5000/catalog/${this.props.match.params.category}/${this.props.match.params.item}`;
    fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('jwt'),
      },
    }).then(this.handleRedirect);
  }

  handleRedirect(result) {
    if (result.status === 200) {
      const url = `/catalog/${this.props.match.params.category}`;
      this.props.history.push(url);
    } else if (result.status === 401) {
      this.setState({ error: 'UNAUTHORIZED DELETE' });
    }
  }


  render() {
    return (
      <div>
        <h2>Are you sure you want to delete {this.state.name}</h2>
        <form onSubmit={this.handleSubmit}>
          <input type="submit" value="submit" />
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
