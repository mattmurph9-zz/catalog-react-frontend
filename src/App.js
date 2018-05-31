import React, { Component } from 'react';
import {
  Route,
  NavLink,
  HashRouter,
  Switch,
} from 'react-router-dom';
import './assets/App.css';
import List from './components/List';
import Latest from './components/Latest';
import Category from './components/Category';
import Item from './components/Item';
import NewItem from './components/NewItem';
import EditItem from './components/EditItem';
import DeleteItem from './components/DeleteItem';
import NewCategory from './components/NewCategory';
import DeleteCategory from './components/DeleteCategory';
import Login from './components/Login';

class App extends Component {
  render() {
    localStorage.setItem('address', 'localhost:5000');
    return (
      <HashRouter>
        <div className="App">
          <header className="App-header">
            <h1 className="App-title">Catalog App</h1>
            <Route path="/" component={Login} />
          </header>
          <NavLink to="/catalog">Show Latest</NavLink>
          <div className="row">
            <div className="col-md-4 col-xs-4">
              <Route path="/catalog" component={List} />
            </div>
            <div className="col-md-8 col-xs-8">
              <Switch>
                <Route exact path="/catalog" component={Latest} />
                <Route exact path="/catalog/new" component={NewCategory} />
                <Route exact path="/catalog/:category" component={Category} />
                <Route exact path="/catalog/:category/delete" component={DeleteCategory} />
                <Route exact path="/catalog/:category/new" component={NewItem} />
                <Route exact path="/catalog/:category/:item/edit" component={EditItem} />
                <Route exact path="/catalog/:category/:item/delete" component={DeleteItem} />
                <Route path="/catalog/:category/:item" component={Item} />
              </Switch>
            </div>
          </div>
        </div>
      </HashRouter>
    );
  }
}

export default App;
