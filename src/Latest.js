import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

class Latest extends Component {
  constructor() {
    super();
    this.state = {
      items: [],
    };
  }

  componentDidMount() {
    const url = 'http://localhost:5000/catalog/latest';
    this.setItemsState(url);
  }

  setItemsState(url) {
    fetch(url, {
        method: 'GET'
      }).then(results => results.json()).then(data => this.setState({ items: data.items }));
  }

  render() {
    const items = this.state.items;
    return (
      <div>
        <h2>Latest Items</h2>
        {items.map(i =>
          (<div key={i.name}>
            <NavLink to={`/catalog/${i.category_name}/${i.name}`}>{i.name} ({i.category_name})</NavLink>
           </div>))}
      </div>
    );
  }
}

export default Latest;
