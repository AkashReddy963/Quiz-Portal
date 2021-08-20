
import React, { Component } from "react";
import { useState } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { GoogleLoginButton } from 'react-social-login-buttons';
import { Button } from 'react-bootstrap';
import './css/styles.css';
import './img/login.jpg';
import facebook from './img/facebook.jpeg';
import google from './img/google.jpeg';
import firebase from "firebase";
import axios from "axios";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";

firebase.initializeApp({
  apiKey: "AIzaSyBhMITYXJdZjEUNxs8hn7zjjUE3dkLrsfc",
  authDomain: "delphi-solutions.firebaseapp.com"
})
export default class Login extends Component {
    constructor(props) {
      super(props);
  
      this.state = {
        email: "",
        password: "",
        isSignedIn: false
      };
  
      this.onChangeEmail = this.onChangeEmail.bind(this);
      this.onChangePassword = this.onChangePassword.bind(this);
  
      this.onSubmit = this.onSubmit.bind(this);
    }
    
    uiConfig = {
      signInFlow: "popup",
      signInOptions: [
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        firebase.auth.FacebookAuthProvider.PROVIDER_ID
      ],
      callbacks: {
        signInSuccess: () => false
      }
    }
    componentDidMount = () => {
      firebase.auth().onAuthStateChanged(user => {
        this.setState({ isSignedIn: !!user })
        console.log("user", user)
      })
    }
    onChangeEmail(event) {
      this.setState({ email: event.target.value });
    }
  
    onChangePassword(event) {
      this.setState({ password: event.target.value });
    }
  
    onSubmit(e) {
      e.preventDefault();
  
      const newUser = {
        email: this.state.email,
        password: this.state.password
      };
  
      axios.post("http://localhost:4000/login", newUser).then(res => {
        console.log("respons", res.data);
        if (res.data.val === 0) {
          console.log("empty fields");
          alert("Please enter email and password");
        } else if (res.data.val === 1) {
          console.log("not registered");
          alert("You are not registered. Register Now!");
        } else if (res.data.val === 2) {
          console.log("incorrect password");
          alert("Incorrect Password! Try again.");
        }
        if (res.data.val === 3) {
          console.log("found");
          this.props.history.push("/Examlist");
            
        }
      });
  
      localStorage.setItem("email", this.state.email);
  
      this.setState({
        email: "",
        password: "",
        isSignedIn: false
      });
    }
  
    render() {   
        return (
            <div>
                   
                <div className="main-wrapper login-body">
                    <div className="login-wrapper">
                        <div className="container">
                            <div className="loginbox">
                                <div className="login-left">                                    
                                    <h3 style={{color:"rgb(214, 224, 230)"}}>DELPHI</h3>
                                </div>
                                <div className="login-right">
                                    <div className="login-right-wrap">
                                        <h1>Login</h1>    
                                        <form onSubmit={this.onSubmit}>
                                            <div className="form-group">
                                                <label>EMAIL: </label>
                                                <input
                                                type="text"
                                                className="form-control"
                                                value={this.state.email}
                                                onChange={this.onChangeEmail}
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label>PASSWORD: </label>
                                                <input
                                                id="password"
                                                type="password"
                                                name="password"
                                                className="form-control"
                                                value={this.state.password}
                                                onChange={this.onChangePassword}
                                                />
                                            </div>
                                            <div className="form-group">
                                                <input type="submit" value="LOGIN" className="btn btn-primary" />
                                            </div>
                                        </form>                                                                                    
                                        
                                        <div className="login-or">
                                            <span className="or-line"></span>
                                            <span className="span-or">or</span>
                                        </div>                                                                                        
                                        <div className="social-login">
                                           {this.state.isSignedIn ? (
            
                                            this.props.history.push("/Examlist")
                                          
                                        ) : (
                                          <StyledFirebaseAuth
                                            uiConfig={this.uiConfig}
                                            firebaseAuth={firebase.auth()}
                                         />
                                        )}
                                        </div>                                                                                        
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
   
            </div>
            
                    

            
            
        );
    }
    
}
