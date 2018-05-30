import React, { Component } from 'react';

class DeleteCategory extends Component {
  constructor() {
    super();
    this.state = {
      error: '',
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleRedirect = this.handleRedirect.bind(this);
  }

  handleSubmit(event) {
    console.log('WE HANDLING SUBMIT');
    event.preventDefault();
    const url = `http://localhost:5000/catalog/${this.props.match.params.category}`;
    console.log(this.props.match.params.category);
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
      console.log('WE HANDLING REDIRECT');
      const url = '/catalog';
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
