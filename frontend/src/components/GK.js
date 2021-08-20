import React, { Component,useState } from "react";
import { BrowserRouter as Router, Route, Link,withRouter,useHistory } from "react-router-dom";
import { GoogleLoginButton } from 'react-social-login-buttons';
import { Button } from 'react-bootstrap';
import './css/styles.css';
import './img/login.jpg';
import facebook from './img/facebook.jpeg';
import google from './img/google.jpeg';
import logo from './img/logo.jpeg';
import General from './img/gk.jpeg';

import axios from "axios";
function loadScript(src) {
	return new Promise((resolve) => {
		const script = document.createElement('script')
		script.src = src
		script.onload = () => {
			resolve(true)
		}
		script.onerror = () => {
			resolve(false)
		}
		document.body.appendChild(script)
	})
}
const __DEV__ = document.domain === 'localhost'
const GK = (props) => {
    const history = useHistory()
    const [name, setName] = useState('Delphi')

	async function displayRazorpay() {
		const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js')

		if (!res) {
			alert('Razorpay SDK failed to load. Are you online?')
			return
		}

		const data = await fetch('http://localhost:4000/razorpay', { method: 'POST' }).then((t) =>
			t.json()
		)

		console.log(data)

		const options = {
			key: __DEV__ ? 'rzp_test_JrEBDNsKWKMAXB' : 'PRODUCTION_KEY',
			currency: data.currency,
			amount: data.amount.toString(),
			order_id: data.id,
			name: 'BUY TEST',
			description: 'YOU CAN TAKE THE TEST AFTER PAYMENT',
			image: 'http://localhost:4000/logo.jpeg',
			handler: function (response) {
				alert(response.razorpay_payment_id)
				alert(response.razorpay_order_id)
                alert(response.razorpay_signature)
                history.push('/exam/GK/instructions')
			},
			prefill: {
				name
			}
		}
		const paymentObject = new window.Razorpay(options)
		paymentObject.open()
	}
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
                            <Button style={{textAlign:"center",backgroundColor:"rgb(253,199,28)"}} ><Link to="/Home" ><b style={{color:"rgb(241,241,241)"}}>Logout</b> </Link></Button>	
                        </div>
                    </li>
                </ul>
                    
                <div className="page-wrapper">
                    <div className="content container-fluid">
                    
                        <div className="page-header">
                            <div className="row">
                                <div className="col-sm-12">
                                    <h3 className="page-title">Exam Details</h3>
                                    <ul className="breadcrumb">
                                    <Link to="/Examlist" ><li className="breadcrumb-item">Exam list/</li></Link>
                                        <li className="breadcrumb-item active">Exam Details</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        
                        <div className="card">
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="about-info">
                                            <h4>Exam Details</h4>
                                            
                                            <div className="media mt-3">
                                                <img src={General} className="mr-3" alt="..."></img>
                                                <div className="media-body">
                                                    <ul>
                                                        <li>
                                                            <span className="title-span">Exam Name : </span>
                                                            <span className="info-span" style={{color:"rgb(77,77,77)"}}>General Knowldge Test</span>
                                                        </li>
                                                        <li>
                                                            <span className="title-span">Examiner Name:</span>
                                                            <span className="info-span" style={{color:"rgb(77,77,77)"}}>Christine</span>
                                                        </li>
                                                        <li>
                                                            <span className="title-span">Course: </span>
                                                            <span className="info-span" style={{color:"rgb(77,77,77)"}}>General Knowldge</span>
                                                        </li>
                                                        
                                                        <li>
                                                            <span className="title-span">Time duration: </span>
                                                            <span className="info-span" style={{color:"rgb(77,77,77)"}}>10 minutes</span>
                                                        </li>
                                                        <li>
                                                            <span className="title-span">Price: </span>
                                                            <span className="info-span" style={{color:"rgb(77,77,77)"}}>INR: 10Rs</span>
                                                        </li>
                                                        <li>
                                                            <span className="title-span">Description: </span>
                                                            <span className="info-span" style={{color:"rgb(77,77,77)"}}>This quiz tests the basics of your General Knowldge </span>
                                                        </li>
                                                        <br></br>
                                                        <div className="title-span">
                                                            <Button className="btn btn-primary btn-block" style={{textAlign:"center",backgroundColor:"rgb(46,46,46)"}}onClick={displayRazorpay}>Pay to Attempt</Button>
                                                        </div>
                                                    </ul>
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
       
    </div>

            </div>
        );
    
}
export default withRouter(GK);