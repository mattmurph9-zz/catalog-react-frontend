import React, { Component } from 'react';

class DeleteCategory extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleRedirect = this.handleRedirect.bind(this);
  }

  handleSubmit(event) {
    console.log('WE HANDLING SUBMIT');
    event.preventDefault();
    const url = `http://localhost:5000/catalog/${this.props.match.params.category}/JSON`;
    console.log(this.props.match.params.category);
    fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: this.props.match.params.category,
      }),
    }).then(this.handleRedirect);
  }

  handleRedirect(result) {
    if (result.status === 200) {
      console.log('WE HANDLING REDIRECT');
      const url = '';
      this.props.history.push(url);
    } else {

    }
  }

  render() {
    return (
      <div>
        <h2>Delete Category {this.props.match.params.category}</h2>
        <form onSubmit={this.handleSubmit}>
          <input type="submit" value="Yes" />
        </form>
      </div>
    );
  }
}

export default DeleteCategory;
