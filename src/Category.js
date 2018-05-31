import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

class Category extends Component {
  constructor() {
    super();
    this.state = {
      items: [],
      category: '',
    };
  }

  componentDidMount() {
    this.setState({ category: this.props.match.params.category });
    const url = `http://localhost:5000/catalog/${this.props.match.params.category}`;
    this.setItemsState(url);
  }

  // fixes issue of user changing categories but items staying the same
  componentWillReceiveProps(nextProps) {
    const url = `http://localhost:5000/catalog/${nextProps.match.params.category}`;
    this.setItemsState(url);
    this.setState({ category: nextProps.match.params.category });
  }

  setItemsState(url) {
    fetch(url, {
      method: 'GET',
    }).then(results => results.json()).then(data => this.setState({ items: data.items }));
  }


  render() {
    return (
      <div>
        <h2>{this.state.category} Items</h2>
        { localStorage.getItem('user') ? <NavLink to={`/catalog/${this.state.category}/delete`}>Delete Category</NavLink> : '' }
        { localStorage.getItem('user') ? <NavLink to={`/catalog/${this.state.category}/new`}>Add Item</NavLink> : '' }
        {this.state.items.map(i => (
          <div key={i.name}>
            <NavLink to={`/catalog/${this.state.category}/${i.name}`}>{i.name}</NavLink>
          </div>))}
      </div>
    );
  }
}

export default Category;
