import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { GoogleLoginButton } from 'react-social-login-buttons';
import { Button } from 'react-bootstrap';
import './css/styles.css';
import './img/login.jpg';
import facebook from './img/facebook.jpeg';
import google from './img/google.jpeg';
import firebase from "firebase";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";

import axios from "axios";

export default class Register extends Component {
	constructor(props) {
        super(props);
    
        this.state = {
          username: "",
          email: "",
          
          password: "",
          isSignedIn: false
        };
    
        this.onChangeUsername = this.onChangeUsername.bind(this);
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
      onChangeUsername(event) {
        this.setState({ username: event.target.value });
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
          username: this.state.username,
          password: this.state.password,
          email: this.state.email,
          
        };
        console.log("New ", newUser);
    
        axios.post("http://localhost:4000/register", newUser).then(res => {
          if (res.data === 1) alert("This username has already been taken");
          console.log(res.data);
        });
    
        this.setState({
          username: "",
          email: "",
          password: "",
          isSignedIn: false
        });
      }
    render(){
        return (            
            <div className="main-wrapper login-body">
            <div className="login-wrapper">
            	<div className="container">
                	<div className="loginbox">
                    <div className="login-left">                                    
                                    <h3 style={{color:"rgb(214, 224, 230)"}}>DELPHI</h3>
                                </div>
                        <div className="login-right">
							<div className="login-right-wrap">
								<h1>Register</h1>
								
								
								<form onSubmit={this.onSubmit}>
                                <div className="form-group">
                                    <label>Username: </label>
                                    <input
                                    type="text"
                                    className="form-control"
                                    value={this.state.username}
                                    onChange={this.onChangeUsername}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Email: </label>
                                    <input
                                    type="text"
                                    className="form-control"
                                    value={this.state.email}
                                    onChange={this.onChangeEmail}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Password: </label>
                                    <input
                                    type="password"
                                    className="form-control"
                                    value={this.state.password}
                                    onChange={this.onChangePassword}
                                    />
                                </div>
									
									
                                    <div className="form-group">
                                        <input type="submit" value="Register" className="btn btn-primary" />
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
								
								
								<div className="text-center dont-have">Already have an account? <Link to="/Login" >Login </Link></div>
							</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>


        );
    }
}
