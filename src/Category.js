import React, { Component } from "react";
import { NavLink } from "react-router-dom";
 
class Category extends Component {
    constructor() {
        super();
        this.state = {
            items: [],
            category: '',
        };
    }

    setItemsState(url){
        fetch(url)
        .then(results => {
            return results.json();
        }).then(data => this.setState({items: data.items}));
    }

    componentDidMount(){
        this.setState({category: this.props.match.params.category});
        var url = 'http://localhost:5000/catalog/' + this.props.match.params.category + '/JSON';
        //var url = 'http://localhost:5000/catalog/Baseball/JSON';
        
        this.setItemsState(url);
    }

    componentWillReceiveProps(nextProps){
        var url = 'http://localhost:5000/catalog/' + nextProps.match.params.category + '/JSON';
        this.setItemsState(url);
        this.setState({category: nextProps.match.params.category})
    }


    render() {
        const category = this.state.category;
        const items = this.state.items;
        return (
            <div>
                <h2>{category} Items</h2>
                <NavLink to={'/catalog/' + category + '/new'}>Add Item</NavLink>
                {items.map(i =>
                    <div key={i.name}>
                        <NavLink to={'/catalog/' + category + '/' + i.name}>{i.name}</NavLink>
                    </div>
                )}
            </div>
        );
    }
}
 
export default Category;