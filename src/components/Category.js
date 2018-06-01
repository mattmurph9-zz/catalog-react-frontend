import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { get } from '../assets/request';

class Category extends Component {
  state = {
    items: [],
  };

  componentDidMount() {
    const url = `/catalog/${this.props.match.params.category}`;
    this.setItemsState(url);
  }

  // fixes issue of user changing categories but items staying the same
  componentWillReceiveProps(nextProps) {
    const url = `/catalog/${nextProps.match.params.category}`;
    this.setItemsState(url);
  }

  setItemsState(url) {
    get(url).then(data => this.setState({ items: data.items }));
  }


  render() {
    const { category } = this.props.match.params;
    return (
      <div>
        <h2>{category} Items</h2>
        { localStorage.getItem('user') ? <NavLink to={`/catalog/${category}/delete`}>Delete Category</NavLink> : '' }
        { localStorage.getItem('user') ? <NavLink to={`/catalog/${category}/new`}>Add Item</NavLink> : '' }
        {this.state.items.map(i => (
          <div key={i.name}>
            <NavLink to={`/catalog/${category}/${i.name}`}>{i.name}</NavLink>
          </div>))}
      </div>
    );
  }
}

export default Category;
