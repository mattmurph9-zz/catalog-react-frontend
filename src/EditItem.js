import React, { Component } from 'react';
import { withRouter, NavLink } from 'react-router-dom';

class EditItem extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      desc: '',
      error: '',
    };

    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleDescChange = this.handleDescChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleRedirect = this.handleRedirect.bind(this);
  }

  componentDidMount() {
    this.setState({ name: this.props.match.params.item });
  }

  handleSubmit(event) {
    console.log(`WE HANDLING SUBMIT ${this.state.name} ${this.state.desc}`);
    event.preventDefault();
    const url = `http://localhost:5000/catalog/${this.props.match.params.category}/${this.props.match.params.item}`;
    fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('jwt'),
      },
      body: JSON.stringify({
        name: this.state.name,
        description: this.state.desc,
      }),
    }).then(this.handleRedirect);
  }

  handleRedirect(result) {
    if (result.status === 200) {
      console.log('WE HANDLING REDIRECT');
      const url = `/catalog/${this.props.match.params.category}/${this.state.name}`;
      this.props.history.push(url);
    } else if (result.status === 400) {
      this.setState({ error: 'INPUT CANNOT BE EMPTY' });
    } else if (result.status === 401) {
      this.setState({ error: 'UNAUTHORIZED EDIT' });
    }
  }

  handleNameChange(event) {
    this.setState({ name: event.target.value });
  }

  handleDescChange(event) {
    this.setState({ desc: event.target.value });
  }


  render() {
    return (
      <div>
        <h2>Edit Item in {this.props.match.params.category}</h2>
        <form onSubmit={this.handleSubmit}>
          <label> Name <br />
            <input type="text" name="name" value={this.state.name} onChange={this.handleNameChange} placeholder={this.state.name} />
          </label> <br />
          <label> Description <br />
            <textarea name="description" value={this.state.desc} onChange={this.handleDescChange} placeholder={this.state.desc} />
          </label><br />
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

export default withRouter(EditItem);
