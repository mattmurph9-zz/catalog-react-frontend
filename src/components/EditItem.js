import React, { Component } from 'react';
import { withRouter, NavLink } from 'react-router-dom';
import { put } from '../assets/request';

class EditItem extends Component {
  state = {
    name: '',
    desc: '',
    error: '',
  };

  componentDidMount() {
    this.setState({ name: this.props.match.params.item });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const url = `/catalog/${this.props.match.params.category}/${this.props.match.params.item}`;
    const content = JSON.stringify({
      name: this.state.name,
      description: this.state.desc,
    });
    put(url, content).then(this.handleRedirect);
  }

  handleRedirect = (result) => {
    if (result.status === 200) {
      const url = `/catalog/${this.props.match.params.category}/${this.state.name}`;
      this.props.history.push(url);
    } else if (result.status === 400) {
      this.setState({ error: 'INPUT CANNOT BE EMPTY' });
    } else if (result.status === 401) {
      this.setState({ error: 'UNAUTHORIZED EDIT' });
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
