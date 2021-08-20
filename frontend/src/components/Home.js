            
import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { GoogleLoginButton } from 'react-social-login-buttons';
import { Button } from 'react-bootstrap';
import './css/styles.css';
import './img/login.jpg';
import exam from './img/quiz.jpeg';
import exam2 from './img/quiz2.jpeg';
import exam4 from './img/quiz6.png';
import logo from './img/logo.jpeg';

import axios from "axios";


export default class Home extends Component {
    render(){
        return (            
            
            
            <div className="main-wrapper">
                    
            
            <div className="header">

               
                <div className="header-left">
                    <a href="index.html" className="logo">
                    <Link to= "/Home" ><img src={logo} alt="Delphi" style={{width:"100px",height:"100px"}}/></Link>
                    </a>
                    
                </div>
            
               
                

                
                <ul className="nav user-menu">

                    <li className="nav-item dropdown noti-dropdown">
                        <div className="media">
                            <br></br>
                            <Button style={{textAlign:"center",backgroundColor:"rgb(226,6,94)"}} ><Link to="/Login" ><b style={{color:"rgb(241,241,241)"}}>Login</b> </Link></Button>	
                        </div>
                    </li>
                </ul>
                <div className="sidebar" id="sidebar">
                    <div className="sidebar-inner slimscroll">
                        <div id="sidebar-menu" className="sidebar-menu">
                            <ul>
                                <li className="menu-title"> 
                                    <span>Main Menu</span>
                                </li>
                                
                                <li> 
                                <Link to="/Home" ><i className="fas fa-shield-alt"></i> <span>Dashboard</span></Link>
                                </li>
                                <li>
                                <Link to="/Login" ><i className="fas fa-shield-alt"/> <span> Login</span></Link>
                                </li>
                                <li>
                                <Link to="/Register" ><i className="fas fa-shield-alt"></i> <span>Register as Student</span> </Link>
                                </li>
                               
                               
                            </ul>
                        </div>
                    </div>
                </div>
               
            <div className="page-wrapper">

                <div className="content container-fluid">
                   
                    <div className="page-header">
                        
                            
                            <h1 style={{font:"Monaco"}}>Welcome to Delphi!</h1>
                            
                             &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;<img src={exam4} alt="Exam" style={{width:"600px",height:"600px"}}></img>
                            
<br></br>
                            <div className="text-center">
                               <Button style={{textAlign:"center",backgroundColor:"rgb(226,6,94)"}}><Link to="/Register"><b style={{color:"rgb(241,241,241)"}}>Register Now </b></Link></Button>
                            </div>
                           
                            
                            
                            		
                    </div>	
                </div>
            </div>
            
            </div>
            </div>

        );
    }
}
