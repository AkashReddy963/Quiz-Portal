import React, { Fragment , useState} from 'react';
/*import NewWindow from 'react-new-window'*/
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import answer from '../../assets/img/answer.png';
import fiftyFifty from '../../assets/img/fiftyFifty.PNG';
import hints from '../../assets/img/hints.PNG';
import options from '../../assets/img/options.PNG';

const QuizInstructions = () =>{ 
	const [agree, setAgree] = useState(false);
	const checkboxHandler = () => 
	{
    		setAgree(!agree);
  	}
    return (
 /*   <NewWindow>*/
    <Fragment>
        <Helmet>
            <title> Welcome to Maths Quiz</title>
            <title>Quiz Instructions</title>
        </Helmet>
        <div className="instructions-wrap container">
            <h1>How to do the quiz?</h1>
            <p>Ensure you read this guide from start to finish.</p>
            <ul id="main-list" className="browser-default">
                <li>The quiz has a duration of 10 minutes and ends as soon as your time elapses.</li>
                <li>Each quiz consist of 5 questions.</li>
                <li>
                    Every question contains 4 options
                    <img src={options} alt="Quiz App - Options example" />
                </li>
                <li>
                    Select the option which best answers provided question by clicking (or selecting) it.
                    <img src={answer} alt="Quiz App - Answer example" />
                </li>
                <li>
                    Each quiz has 2 lifelines namely:
                    <ul id="sublist">
                        <li>50/50 chances</li>
                        <li>5 Hints</li>
                    </ul>
                </li>
                <li>
                    Selecting a 50/50 lifeline by clicking the 
                    " <span className="mdi mdi-set-center mdi-24px lifeline-icon"></span> " 
                    icon will remove 2 wrong answers,
                    leaving one wrong and a correct one. <br />
                        <img src={fiftyFifty} alt="Quiz App - 50/50 example" />
                </li>
                <li>
                    Using a hint by clicking the
                    " <span className="mdi mdi-lightbulb-on mdi-24px lifeline-icon"></span> "
                    icon will remove one wrong answer,
                    leaving two wrong answers and a correct one.
                    You can use as many hints as possible on a single question.<br />
                    <img src={hints} alt="Quiz App - Hints example" />
                </li>
                <li>
                    Feel free to quit from the quiz at any time.
                </li>
                <li>
                    The timer starts as soon as the quiz loads.
                </li>
                <li>
                    Let's do this if you think you've got what it takes?
                </li>
            </ul>
	    <div style={{backgroundColor:"white"}}>
	        <div className="container" style={{backgroundColor:"white"}}>
            <div> 
	                <input type="checkbox" id="agree" onChange={checkboxHandler}/>
	    		<label htmlFor="agree" style={{color:"#080600"}}><span><h5> Click on this text if you agree to <b>the given instructions and conditions</b></h5></span></label>
      		    </div>
	    	</div>
	    </div> 
            <div>
                <span className="left">
                    <Link to="/Examlist">No, take me back!</Link>
                </span>
                <span className="right">
	    		<button disabled={!agree} className="btn">
                        	<Link to="/exam/Maths/quiz" style={{ color: '#080600' }}>
                        	<b>
                          	       Attempt Quiz Now
                        	</b>
                    		</Link>
                	</button>
                </span>
            </div>
        </div>
    </Fragment>
 /*   </NewWindow>*/
);
};

export default QuizInstructions;