import React, { Component } from 'react';
import {
  Route,
  NavLink,
  HashRouter,
  Switch,
} from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import List from './List';
import Latest from './Latest';
import Category from './Category';
import Item from './Item';
import NewItem from './NewItem';
import DeleteItem from './DeleteItem';
import NewCategory from './NewCategory';

class App extends Component {
  render() {
    return (
      <HashRouter>
        <div className="App">
          <header className="App-header">
            <h1 className="App-title">Catalog App</h1>
          </header>
          <div className="content">
            <Route path="/" component={List} />
            <Route path="/Latest" component={Latest} />
            <Switch>
              <Route exact path="/catalog/new" component={NewCategory} />
              <Route exact path="/catalog/:category" component={Category} />
              <Route exact path="/catalog/:category/new" component={NewItem} />
              <Route exact path="/catalog/:category/:item/delete" component={DeleteItem} />
              <Route path="/catalog/:category/:item" component={Item} />
            </Switch>
          </div>
        </div>
      </HashRouter>
    );
  }
}

export default App;
