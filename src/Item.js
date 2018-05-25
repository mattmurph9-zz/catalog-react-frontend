import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

class Item extends Component {
  constructor() {
    super();
    this.state = {
      item_name: '',
      item_desc: '',
      creator: '',
    };
  }

  setItemState(url) {
    fetch(url)
      .then(results => results.json()).then(data => this.setState({ item_name: data.item.name, item_desc: data.item.description, creator: data.item.creator, }));
  }

  componentWillReceiveProps(nextProps) {
    console.out(nextProps);
    const url = `http://localhost:5000/catalog/${this.props.match.params.category}/${this.props.match.params.item}/JSON`;
    this.setItemState(url);
  }

  componentDidMount() {
    const url = `http://localhost:5000/catalog/${this.props.match.params.category}/${this.props.match.params.item}/JSON`;
    this.setItemState(url);
  }

  render() {
    return (
      <div>
        <h2>{this.state.item_name}</h2>
        <p>{this.state.item_desc}</p>
        {localStorage.getItem('user') === this.state.creator ? 
        (<div><NavLink to={`/catalog/${this.props.match.params.category}/${this.props.match.params.item}/edit`}>Edit Item</NavLink>
        <NavLink to={`/catalog/${this.props.match.params.category}/${this.props.match.params.item}/delete`}>Delete Item</NavLink></div>)
        : '' }
      </div>
    );
  }
}

export default Item;
