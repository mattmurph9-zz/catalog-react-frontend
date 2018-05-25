import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

class DeleteItem extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleRedirect = this.handleRedirect.bind(this);
  }

  setItemState(name, desc) {

  }

  componentWillReceiveProps(nextProps) {

  }

  componentDidMount() {
    this.setState({ name: this.props.match.params.item });
  }

  handleSubmit(event) {
    console.log(`WE HANDLING SUBMIT ${this.state.name}`);
    event.preventDefault();
    const url = `http://localhost:5000/catalog/${this.props.match.params.category}/${this.state.name}/JSON`;
    fetch(url, {
      method: 'DELETE',
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
      console.log('WE HANDLING REDIRECT IN DELETE ITEM');
      const url = `/catalog/${this.props.match.params.category}`;
      this.props.history.push(url);
    } else {

    }
  }


  render() {
    return (
      <div>
        <h2>Are you sure you want to delete {this.state.name}</h2>
        <form onSubmit={this.handleSubmit}>
          <input type="submit" value="submit" />
        </form>
      </div>
    );
  }
}

export default DeleteItem;
