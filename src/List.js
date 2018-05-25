import React, { Component } from 'react';
import {
  NavLink,
} from 'react-router-dom';

class List extends Component {
  constructor() {
    super();
    this.state = {
      categories: [],
    };
  }

  componentDidMount() {
    fetch('http://localhost:5000/catalog/JSON')
      .then(results => results.json()).then(data => this.setState({ categories: data.categories }));
  }

  render() {
    const categories = this.state.categories;
    return (
      <div>
        <h2>Categories</h2>
        {categories.map(cat =>
          (<div key={cat.name}>
            <NavLink to={`/catalog/${cat.name}`}>{cat.name}</NavLink>
           </div>))}
           <NavLink to={'/catalog/new'}>Add Category</NavLink>
      </div>
    );
  }
}

export default List;
