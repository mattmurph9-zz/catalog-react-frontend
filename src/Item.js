import React, { Component } from "react";
import { NavLink } from "react-router-dom";
 
class Item extends Component {
    constructor() {
        super();
        this.state = {
            item_name: '',
            item_desc: '',
        };
    }

    setItemState(url){
        fetch(url)
        .then(results => {
            return results.json();
        }).then(data => this.setState({item_name: data.item.name, item_desc: data.item.description}));
    }

    componentWillReceiveProps(nextProps){
        console.out(nextProps)
        var url = 'http://localhost:5000/catalog/' + this.props.match.params.category + '/' + this.props.match.params.item +'/JSON';
        this.setItemState(url);
    }

    componentDidMount(){
        var url = 'http://localhost:5000/catalog/' + this.props.match.params.category + '/' + this.props.match.params.item +'/JSON';
        this.setItemState(url);
    }

  render() {
    
    return (
      <div>
        <h2>{this.state.item_name}</h2>
        <p>{this.state.item_desc}</p>
        <NavLink to={'/catalog/' + this.props.match.params.category + '/' + this.props.match.params.item+'/delete'}>Delete Item</NavLink>
      </div>
    );
  }
}
 
export default Item;