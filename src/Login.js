import React, { Component } from 'react';
import GoogleLogin from 'react-google-login';
import { NavLink } from 'react-router-dom';
import { UserContext} from './App'


class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
        username: '',
      loggedIn: false,
      access_token: '',
    };
    this.responseGoogle = this.responseGoogle.bind(this);
    this.logoutClick = this.logoutClick.bind(this);
  }

  responseGoogle = (response) => {
    var gresponse = response;
    console.log(response);
    //SEND ACCESS TOKEN TO http://localhost:5000/reactconnect
    var url = 'http://localhost:5000/reactconnect';
    fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          access_token: response.accessToken,
          token_id: response.El,
          email: response.w3.U3,
          name: response.w3.ig,
          picture: response.w3.Paa,
        }),
      }).then((response) => {console.log('response: ',response.status)
      if(response.status == 200){localStorage.setItem('user', gresponse.w3.U3); console.log(localStorage.getItem('user'));this.setState({loggedIn: true, username: gresponse.w3.ig, access_token: gresponse.accessToken});}});;
    console.log('WE IN RESPONSE GOOGLE');
    
  };

  logoutClick(event){
    console.log('logout clicked')
    var url = 'http://localhost:5000/reactdisconnect';
    fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          access_token: this.state.access_token,
        }),
      }).then((response) => {console.log('response: ',response.status);
                            localStorage.removeItem('user');
                            console.log(localStorage.getItem('user'));
                            if(response.status == 200){this.setState({loggedIn: false, username: '', });}});
  }

  render() {
    
    if (!localStorage.getItem('user')) {
      return (
        <div>
          <GoogleLogin
            clientId="478409975120-viuc54krpcce2fq7sm6158lc6i25p3bq.apps.googleusercontent.com"
            buttonText="Login"
            onSuccess={this.responseGoogle}
            onFailure={this.responseGoogle}
          />
        </div>
      );
    }
    else {
        return(
            <div>
                <p>{localStorage.getItem('user')}</p>
                <a href='/#/catalog' onClick={this.logoutClick}>logout</a>
            </div>
        );
    }
  }
}

export default Login;
