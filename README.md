Delphi - A Quiz App
This is a simple quiz portal that allows the user to register and take timed quizzes on various subjects.

Installations
clone the repo and navigate into the delphi folder and run the following commands:
$ sudo mongod
$ cd backend
$ npm install 
$ npm start
Open a new terminal window/tab and navigate into delphi folder, then run these next set of commands:
$ cd frontend
$ npm install
$ npm start
Your app will now run on port 3000
Incase of error, check for the following dependencies:
$ npm install --save "react-helmet"
$ npm install --save "react-router-dom"
$ npm install --save "react-dom"
$ npm install --save "classnames"
$ npm install --save "gh-pages"
$ npm install --save "materialize-css"
$ npm install --save "@mdi/font"
$ npm install --save “react-bootstrap”
$ npm install --save “react”
$ npm install node-sass@4.14.1

Usage

As a student

Register with your email and a password, and login to see quizzes
Click on subject of interest and pay to proceed to the instructions page
Every attempt is paid, so do not pay unless you wish to start the quiz
Read the instructions before attempting the quiz
Your results will be displayed when it ends


Contributing

To add quizzes to this portal

create a .js file in fronted components following format of other files, and give appropriate paths and details

import physics from './img/physics.jpeg';
handler: function (response) {
	alert(response.razorpay_payment_id)
	alert(response.razorpay_order_id)
        alert(response.razorpay_signature)
        history.push('/exam/Physics/instructions')
},
export default withRouter(Physics);
<li>
    <span className="title-span">Exam Name : </span>
    <span className="info-span" style={{color:"rgb(77,77,77)"}}>Physics Test</span>
</li>
<li>
    <span className="title-span">Examiner Name:</span>
    <span className="info-span" style={{color:"rgb(77,77,77)"}}>Peter Kevinsky</span>
</li>
<li>
    <span className="title-span">Course: </span>
    <span className="info-span" style={{color:"rgb(77,77,77)"}}>Physics</span>
</li>


create a .json file in Questions folder in components, and add questions following format of other *.json files

     {
         "question": "Which among the following colors lights has the maximum energy",
         "optionA": "Violet",
         "optionB": "Red",
         "optionC": "Green",
         "optionD": "Blue",
         "answer": "Violet"               
     },

Similarly, update and add a directory in exams component under subject name, and add appropriate js files following format

QuizInstructions.js  Quiz.js  QuizSummary.js


Add images if any in img under components


Now run the app again to check if it is functional



License
Unlicensed
