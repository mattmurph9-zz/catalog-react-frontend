import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { get } from '../assets/request';

class Latest extends Component {
  state = {
    items: [],
  };

  componentDidMount() {
    this.setItemsState();
  }

  setItemsState = () => {
    const url = '/catalog/latest';
    get(url).then(data => this.setState({ items: data.items }));
  }

  render() {
    return (
      <div>
        <h2>Latest Items</h2>
        {this.state.items.map(i => (
          <div key={i.name}>
            <NavLink to={`/catalog/${i.category_name}/${i.name}`}>{i.name} ({i.category_name})</NavLink>
          </div>))}
      </div>
    );
  }
}

export default Latest;
