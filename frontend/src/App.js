import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"

import Login from './components/Login'
import Home from './components/Home'
import Register from './components/Register'
import Examlist from './components/Examlist'
import Maths from './components/Maths'
import Physics from './components/Physics'
import Chemistry from './components/Chemistry'
import Social from './components/Social'
import GK from './components/GK'
import QuizInstructionsC from './components/exam/Chemistry/QuizInstructions';
import QuizC from './components/exam/Chemistry/Quiz';
import QuizSummaryC from './components/exam/Chemistry/QuizSummary';
import QuizInstructionsM from './components/exam/Maths/QuizInstructions';
import QuizM from './components/exam/Maths/Quiz';
import QuizSummaryM from './components/exam/Maths/QuizSummary';
import QuizInstructionsP from './components/exam/Physics/QuizInstructions';
import QuizP from './components/exam/Physics/Quiz';
import QuizSummaryP from './components/exam/Physics/QuizSummary';
import QuizInstructionsS from './components/exam/Social/QuizInstructions';
import QuizS from './components/exam/Social/Quiz';
import QuizSummaryS from './components/exam/Social/QuizSummary';
import QuizInstructionsG from './components/exam/GK/QuizInstructions';
import QuizG from './components/exam/GK/Quiz';
import QuizSummaryG from './components/exam/GK/QuizSummary';

function App() {
  return (
    <Router>
      <div className="container">
       
       
        <Route exact path="/" component={Home}/>
        <Route exact path="/Home" component={Home}/>
        <Route exact path="/Login" component={Login}/>
        <Route exact path="/Register" component={Register}/>
        <Route exact path="/Examlist" component={Examlist}/>
        <Route exact path="/Maths" component={Maths}/>
        <Route exact path="/Physics" component={Physics}/>
         <Route exact path="/Chemistry" component={Chemistry}/>
         <Route exact path="/Social" component={Social}/>
         <Route exact path="/GK" component={GK}/>
         <Route exact path="/exam/Chemistry/instructions" exact component={QuizInstructionsC} />
         <Route exact path="/exam/Chemistry/quiz" exact component={QuizC} />
         <Route exact path="/exam/Chemistry/QuizSummary" exact component={QuizSummaryC} />
         <Route exact path="/exam/Maths/instructions" exact component={QuizInstructionsM} />
         <Route exact path="/exam/Maths/quiz" exact component={QuizM} />
         <Route exact path="/exam/Maths/QuizSummary" exact component={QuizSummaryM} />
         <Route exact path="/exam/Physics/instructions" exact component={QuizInstructionsP} />
         <Route exact path="/exam/Physics/quiz" exact component={QuizP} />
         <Route exact path="/exam/Physics/QuizSummary" exact component={QuizSummaryP} />
         <Route exact path="/exam/Social/instructions" exact component={QuizInstructionsS} />
         <Route exact path="/exam/Social/quiz" exact component={QuizS} />
         <Route exact path="/exam/Social/QuizSummary" exact component={QuizSummaryS} />
         <Route exact path="/exam/GK/instructions" exact component={QuizInstructionsG} />
         <Route exact path="/exam/GK/quiz" exact component={QuizG} />
         <Route exact path="/exam/GK/QuizSummary" exact component={QuizSummaryG} />
         

      </div>
    </Router>
  );
}

export default App;
