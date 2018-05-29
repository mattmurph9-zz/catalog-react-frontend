import React, { Component } from 'react';
import {
  NavLink,
} from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';

class List extends Component {
  constructor() {
    super();
    this.state = {
      categories: [],
    };
    this.updateState = this.updateState.bind(this);
  }

  componentDidMount() {
    const history = createHistory();
        history.listen((location, action) => {
            //this.updateState();
        });

    console.log("IN DIDMOUNT FOR CAT LIST");
    this.updateState();
  }

  componentWillUnmount() {
    console.log('UNMOUNT');
  }

  componentWillReceiveProps(nextProps) {
    console.log("WE IN WRC");
  }

  updateState() {
    console.log("UPDATING STATE");
    fetch('http://localhost:5000/catalog')
      .then(results => results.json()).then(data => this.setState({ categories: data.categories }));
  }

  render() {
    const categories = this.state.categories;
    return (
      <div>
        <h2>Categories</h2>
        {categories.map(cat =>
          (<div key={cat.name}>
            <NavLink className="btn" to={`/catalog/${cat.name}`}>{cat.name}</NavLink>
           </div>))}
           { localStorage.getItem('user') ? <NavLink to={'/catalog/new'}>Add Category</NavLink> : ''}
           
      </div>
    );
  }
}

export default List;
