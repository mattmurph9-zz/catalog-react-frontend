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

  setItemsState(url) {
    fetch(url, {
        method: 'GET'
      }).then(results => results.json()).then(data => this.setState({ items: data.items }));
  }

  componentDidMount() {
    console.log("WE IN DIDMOUNT FOR CAT ITEM LIST");
    this.setState({ category: this.props.match.params.category });
    const url = `http://localhost:5000/catalog/${this.props.match.params.category}`;
    // var url = 'http://localhost:5000/catalog/Baseball/JSON';

    this.setItemsState(url);
  }

  componentWillReceiveProps(nextProps) {
    const url = `http://localhost:5000/catalog/${nextProps.match.params.category}`;
    this.setItemsState(url);
    this.setState({ category: nextProps.match.params.category });
  }


  render() {
    const category = this.state.category;
    const items = this.state.items;
    return (
      <div>
        <h2>{category} Items</h2>
        { localStorage.getItem('user') ? <NavLink to={`/catalog/${category}/delete`}>Delete Category</NavLink> : '' }
        { localStorage.getItem('user') ? <NavLink to={`/catalog/${category}/new`}>Add Item</NavLink> : '' }
        {items.map(i =>
          (<div key={i.name}>
            <NavLink to={`/catalog/${category}/${i.name}`}>{i.name}</NavLink>
           </div>))}
      </div>
    );
  }
}

export default Category;
