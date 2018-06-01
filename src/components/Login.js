import React, { Component } from 'react';
import GoogleLogin from 'react-google-login';
import { NavLink } from 'react-router-dom';


class Login extends Component {
  state = {
    access_token: '',
  };

  responseGoogle = (response) => {
    const gresponse = response;
    // SEND ACCESS TOKEN TO http://localhost:5000/reactconnect
    const url = `http://${localStorage.getItem('address')}/reactconnect`;
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
    }).then(result => result.json()).then((data) => {
      console.log(data);
      if (data.jwt) {
        localStorage.setItem('user', gresponse.w3.U3);
        localStorage.setItem('jwt', data.jwt);
        this.setState({ access_token: gresponse.accessToken });
      }
    });
  };

  logoutClick = () => {
    console.log('logout clicked');
    const url = 'http://localhost:5000/reactdisconnect';
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        access_token: this.state.access_token,
      }),
    }).then((response) => {
      console.log('response: ', response.status);
      localStorage.removeItem('user');
      localStorage.removeItem('jwt');
      this.setState({ access_token: '' });
    });
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

    return (
      <div>
        <p>{localStorage.getItem('user')}</p>
        <NavLink to="/catalog" onClick={this.logoutClick}>logout</NavLink>
      </div>
    );
  }
}

export default Login;
