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
    this.updateState = this.updateState.bind(this);
  }

  componentDidMount() {
    this.updateState();
  }

  componentWillReceiveProps() {
    //this.updateState();
  }

  updateState() {
    fetch(`http://${localStorage.getItem('address')}/catalog`)
      .then(results => results.json()).then(data => this.setState({ categories: data.categories }));
  }

  render() {
    return (
      <div>
        <h2>Categories</h2>
        {this.state.categories.map(cat => (
          <div key={cat.name}>
            <NavLink className="btn" to={`/catalog/${cat.name}`}>{cat.name}</NavLink>
          </div>))}
        { localStorage.getItem('user') ? <NavLink to="/catalog/new">Add Category</NavLink> : ''}

      </div>
    );
  }
}

export default List;
