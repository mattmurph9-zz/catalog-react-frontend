import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

class Item extends Component {
  constructor() {
    super();
    this.state = {
      item_name: '',
      item_desc: '',
      creator: '',
      match: false,
    };
  }

  componentDidMount() {
    const url = `http://localhost:5000/catalog/${this.props.match.params.category}/${this.props.match.params.item}`;
    this.setItemState(url);
  }

  componentWillReceiveProps(nextProps) {
    console.out(nextProps);
    const url = `http://localhost:5000/catalog/${this.props.match.params.category}/${this.props.match.params.item}`;
    this.setItemState(url);
  }

  setItemState(url) {
    fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('jwt'),
      },
    }).then(results => results.json()).then((data) => { this.setState({ item_name: data.item.name, item_desc: data.item.description, creator: data.item.creator }); });
  }

  render() {
    return (
      <div>
        <h2>{this.state.item_name}</h2>
        <p className="font-weight-light">Creator: {this.state.creator}</p>
        <p>{this.state.item_desc}</p>
        {this.state.creator === localStorage.getItem('user') ? (
          <div><NavLink to={`/catalog/${this.props.match.params.category}/${this.props.match.params.item}/edit`}>Edit Item</NavLink>
            <NavLink to={`/catalog/${this.props.match.params.category}/${this.props.match.params.item}/delete`}>Delete Item</NavLink>
          </div>) : '' }
        <NavLink to={`/catalog/${this.props.match.params.category}`} onClick={this.logoutClick}>Back to {this.props.match.params.category}</NavLink>
      </div>
    );
  }
}

export default Item;
