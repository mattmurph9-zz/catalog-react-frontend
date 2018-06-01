import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { get } from '../assets/request';

class Item extends Component {
  state = {
    item_name: '',
    item_desc: '',
    creator: '',
  };

  componentDidMount() {
    this.setItemState();
  }

  componentWillReceiveProps() {
    this.setItemState();
  }

  setItemState() {
    const url = `/catalog/${this.props.match.params.category}/${this.props.match.params.item}`;
    get(url).then((data) => { this.setState({ item_name: data.item.name, item_desc: data.item.description, creator: data.item.creator }); });
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
        <NavLink to={`/catalog/${this.props.match.params.category}`}>Back to {this.props.match.params.category}</NavLink>
      </div>
    );
  }
}

export default Item;
