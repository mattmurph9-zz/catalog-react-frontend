import React, { Component } from 'react';
import { withRouter, NavLink } from 'react-router-dom';
import { post } from '../assets/request';

class NewItem extends Component {
  state = {
    name: '',
    desc: '',
    error: '',
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const url = `/catalog/${this.props.match.params.category}`;
    const content = JSON.stringify({
      name: this.state.name,
      description: this.state.desc,
      creator: localStorage.getItem('user'),
    });
    post(url, content).then(this.handleRedirect);
  }

  handleRedirect = (result) => {
    if (result.status === 200) {
      const url = `/catalog/${this.props.match.params.category}/${this.state.name}`;
      this.props.history.push(url);
    } else if (result.status === 400) {
      this.setState({ error: 'INPUT CANNOT BE EMPTY' });
    } else if (result.status === 409) {
      this.setState({ error: 'ITEM NAME MUST BE UNIQUE' });
    }
  }

  handleNameChange = (event) => {
    this.setState({ name: event.target.value });
  }

  handleDescChange = (event) => {
    this.setState({ desc: event.target.value });
  }


  render() {
    return (
      <div>
        <h2>New Item in {this.props.match.params.category}</h2>
        <form onSubmit={this.handleSubmit}>
          <label> Name <br />
            <input type="text" name="name" value={this.state.name} onChange={this.handleNameChange} placeholder={this.state.name} />
          </label> <br />
          <label> Description <br />
            <textarea name="description" value={this.state.desc} onChange={this.handleDescChange} placeholder={this.state.desc} />
          </label><br />
          <input type="submit" value="submit" />
        </form>
        <NavLink to={`/catalog/${this.props.match.params.category}`}>Cancel</NavLink>
        <div className="row">
          { this.state.error !== '' ? (
            <div className="alert alert-danger col-md-6 col-xs-6">
              <strong>{this.state.error}</strong>
            </div>) : '' }
        </div>
      </div>
    );
  }
}

export default withRouter(NewItem);
