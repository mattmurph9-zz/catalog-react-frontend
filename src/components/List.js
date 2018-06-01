import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { get } from '../assets/request';

class List extends Component {
  state = {
    categories: [],
  };

  componentDidMount() {
    this.updateState();
  }

  updateState = () => {
    const url = '/catalog/';
    get(url).then(data => this.setState({ categories: data.categories }));
  }

  render() {
    return (
      <div>
        <h2>Categories</h2>
        {this.state.categories.map(cat => (
          <div key={cat.name}>
            <NavLink className="btn" to={`/catalog/${cat.name}`}>{cat.name}</NavLink>
          </div>))}
        {localStorage.getItem('user') ? <NavLink to="/catalog/new">Add Category</NavLink> : ''}

      </div>
    );
  }
}

export default List;
