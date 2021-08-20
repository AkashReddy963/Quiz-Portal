import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { GoogleLoginButton } from 'react-social-login-buttons';
import { Button } from 'react-bootstrap';
import './css/styles.css';
import './img/login.jpg';
import facebook from './img/facebook.jpeg';
import google from './img/google.jpeg';
import logo from './img/logo.jpeg';
import firebase from "firebase"
import axios from "axios";

export default class Examlist extends Component {
    render(){
        return (
        <div>
            <div className="main-wrapper">
            <div className="header">
                 <div className="header-left">
                    <a href="index.html" className="logo">
                    <Link to="/Home" ><img src={logo} alt="Delphi" style={{width:"100px",height:"100px"}}/></Link>
                    </a>
                    
                </div>
				<a className="mobile_btn" id="mobile_btn">
					<i className="fas fa-bars"></i>
				</a>
                <ul className="nav user-menu">

                    <li className="nav-item dropdown noti-dropdown">
                        <div className="media">
                            <br></br>
                            <Button style={{textAlign:"center",backgroundColor:"rgb(253,199,28)"}} ><Link to="/Home" ><b style={{color:"rgb(241,241,241)"}}onClick={() => firebase.auth().signOut()}>Logout</b> </Link></Button>	
				
                        </div>
                    </li>
                </ul>
            <div className="page-wrapper">
                <div className="content container-fluid">	
					<div className="page-header">
						<div className="row align-items-center">
							<div className="col">
                                <h2 className="page-title" style={{color:"rgb(99,105,145)"}}>Welcome Student!</h2>
                                <br></br>
								<h3 className="page-title">Exam List</h3>
								
							</div>
							
						</div>
					</div>
					
				
					<div className="row">
						<div className="col-sm-12">
						
							<div className="card card-table">
								<div className="card-body">
									<div className="table-responsive">
										<table className="table table-hover table-center mb-0 datatable">
											<thead>
												<tr>
													<th>Exam Name</th>
													<th>Course</th>
													<th>Examiner</th>
													<th>Published Date</th>
                                                    <th>Exam Duration</th>

													
												</tr>
											</thead>
											<tbody>
												<tr>
													<td>
														<h2>
															
                                                        <Link to="/Maths" >Maths Test</Link>
														</h2>
													</td>
													<td>Maths</td>
													<td>John Ambrose</td>
													<td>23 Apr 2021</td>
                                                    <td>10 minutes</td>
													
												</tr>
												<tr>
													<td>
														<h2>
                                                        <Link to="/Physics" >Physics Test</Link>
														</h2>
													</td>
													<td>Physics</td>
													<td>Peter Kevinsky</td>
													<td>23 Apr 2021</td>
                                                    <td>10 minutes</td>
													
												</tr>
												<tr>
													<td>
														<h2>
                                                        <Link to="/Chemistry" >Chemistry Test</Link>
														</h2>
													</td>
													<td>Chemistry</td>
													<td>Lara Jean</td>
													<td>23 Apr 2021</td>
                                                    <td>10 minutes</td>
													
												</tr>
												<tr>
													<td>
														<h2>
                                                        <Link to="/Social" >Social Studies</Link>
														</h2>
													</td>
													<td>Social Studies</td>
													<td>Genevieve</td>
													<td>23 Apr 2021</td>
                                                    <td>10 minutes</td>
													
												</tr>
												<tr>
													<td>
														<h2>
                                                        <Link to="/GK" >General Knowledge</Link>
														</h2>
													</td>
													<td>General Knowledge</td>
													<td>Christine</td>
													<td>23 Apr 2021</td>
                                                    <td>10 minutes</td>
													
												</tr>
												
											</tbody>
										</table>
									</div>
								</div>
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