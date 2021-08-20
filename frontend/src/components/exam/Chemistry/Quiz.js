import React, { Component, Fragment } from 'react'
import Helmet from 'react-helmet';
import M from 'materialize-css';
import classnames from 'classnames';
import { Link } from 'react-router-dom';
import one from '../../assets/img/Chemistry/q1.jpeg';
import two from '../../assets/img/Chemistry/q2.jpeg';
import three from '../../assets/img/Chemistry/q3.jpeg';
import four from '../../assets/img/Chemistry/q4.jpeg';
import five from '../../assets/img/Chemistry/q5.jpeg';


import questions from '../../Questions/Chemistry.json';
import isEmpty from '../../utils/is-empty';
import correctNotification from '../../assets/sound/correct-answer.mp3';
import wrongNotification from '../../assets/sound/wrong-answer.mp3';
import buttonNotification from '../../assets/sound/button-sound.mp3';
const images={"1":one,"2":two,"3":three,"4":four,"5":five}

export class Quiz extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            questions,
            currentQuestion: {},
            nextQuestion: {},
            previousQuestion: {},
            answer: '',
            numberOfQuestions: 0,
            numberOfAnsweredQuestions: 0,
            numberOfUnansweredQuestions: 0,
            currentQuestionIndex: 0,
            score: 0,
            correctAnswers: 0,
            wrongAnswers: 0,
            hints: 5,
            fiftyFifty: 2,
            usedFiftyFifty: false,
            nextButtonDisabled: false,
            previousButtonDisabled: true,
            previousRandomNumbers: [],
            time: {}
        };
        this.interval = null;
        this.correctSound = React.createRef();
        this.wrongSound = React.createRef();
        this.buttonSound = React.createRef();
    };

    componentDidMount() {
        const { questions, currentQuestion, nextQuestion, previousQuestion } = this.state;
        this.displayQuestions(questions, currentQuestion, nextQuestion, previousQuestion);
        this.startTimer();
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    displayQuestions = (questions = this.state.questions, currentQuestion, nextQuestion, previousQuestion) => {
        let { currentQuestionIndex } = this.state;
        if(!isEmpty(this.state.questions)) {
            questions = this.state.questions;
            currentQuestion = questions[currentQuestionIndex];
            nextQuestion = questions[currentQuestionIndex + 1];
            previousQuestion = questions[currentQuestionIndex - 1];
            const answer = currentQuestion.answer;
            this.setState({
                currentQuestion: currentQuestion,
                nextQuestion,
                previousQuestion,
                numberOfQuestions: questions.length,
                answer,
                previousRandomNumbers: []
             }, () => {
                 this.showOptions();
                 this.handleDisableButton();
             });
        }
    };

    handleOptionClick = (event) => {
    event.target.color ="green";
        if(event.target.innerHTML.toLowerCase() === this.state.answer.toLowerCase()) 
        {
            setTimeout(() => {
                this.correctSound.current.play();
            }, 500);
            this.correctAnswer();
        }
        else {
            setTimeout(() =>{
                this.wrongSound.current.play();
            }, 500)
            this.wrongAnswer();
        }
    };

    handleNextButtonClick = () => {
        this.playButtonSound();
        if(this.state.nextQuestion !== undefined) {
            this.setState(prevState => ({
                currentQuestionIndex: prevState.currentQuestionIndex + 1 
            }), () => {
                this.displayQuestions(this.state.question, this.state.currentQuestion, this.state.nextQuestion, this.state.previousQuestion);
            });
        }
    };

     handleQButtonClick = (i) => {
        this.playButtonSound();
        if(this.state.nextQuestion+1 !== undefined) {
            this.setState(prevState => ({
		    currentQuestionIndex: i
            }), () => {
                this.displayQuestions(this.state.question, this.state.currentQuestion, this.state.nextQuestion, this.state.previousQuestion);
            });
        }
   };

    handlePreviousButtonClick = () => {
        this.playButtonSound();
        if(this.state.previousQuestion !== undefined) {
            this.setState(prevState => ({
                currentQuestionIndex: prevState.currentQuestionIndex - 1 
            }), () => {
                this.displayQuestions(this.state.question, this.state.currentQuestion, this.state.nextQuestion, this.state.previousQuestion);
            });
        }
    };

    handleQuitButtonClick = () => {
        this.playButtonSound();
        if(window.confirm('Are you sure you want to quit?')) {
            this.props.history.push('/Examlist');
        }
    }


    handleButtonClick = (event) => {
        switch(event.target.id) {
            
            case 'next-button':
                  this.handleNextButtonClick();
                  break;

            case 'previous-button':
                  this.handlePreviousButtonClick();
                  break;

            case 'q1': this.handleQButtonClick(0); break;
            case 'q2': this.handleQButtonClick(1); break;
            case 'q3': this.handleQButtonClick(2); break;
            case 'q4': this.handleQButtonClick(3); break;
            case 'q5': this.handleQButtonClick(4); break;
            
            case 'first' : this.handleQButtonClick(0); break;
            case 'last' : this.handleQButtonClick(4); break;
            case 'quit-button':
                  this.handleQuitButtonClick();
                  break;
            case 'submit':
            this.endGame();
            break;
            default:
                break;
        }
    }

    playButtonSound = () => {
        this.buttonSound.current.play();
    }

    correctAnswer = () => {
        M.toast({ 
            html: 'Correct Answer',
            classes: 'toast-valid',
            displayLength: 1500
        });
        this.setState(prevState => ({
            score: prevState.score + 1,
            correctAnswers: prevState.correctAnswers + 1,
            currentQuestionIndex: prevState.currentQuestionIndex + 1,
            numberOfAnsweredQuestions: prevState.numberOfAnsweredQuestions + 1
        }), () => {
            if(this.state.nextQuestion === undefined) {
                this.handleQButtonClick(4);
            }
            else {
                this.displayQuestions(this.state.questions, this.state.currentQuestion, this.state.nextQuestion, this.state.previousQuestion);
            }
        });
    };

    wrongAnswer = () => {
        navigator.vibrate(1000);
        M.toast({
            html: 'Wrong Answer',
            classes: 'toast-invalid',
            displayLength: 1500
        });
        this.setState(prevState => ({
            wrongAnswers: prevState.wrongAnswers + 1,
            currentQuestionIndex: prevState.currentQuestionIndex + 1,
            numberOfAnsweredQuestions: prevState.numberOfAnsweredQuestions + 1
        }), () => {
            if(this.state.nextQuestion === undefined) {
                this.handleQButtonClick(4);
            } 
            else {
                this.displayQuestions(this.state.questions, this.state.currentQuestion, this.state.nextQuestion, this.state.previousQuestion);
            }
        });
    };

    showOptions = () => {
        const options = Array.from(document.querySelectorAll('.option'));

        options.forEach((option) => {
            option.style.visibility = 'visible';
        });

        this.setState({
            usedFiftyFifty: false
        });

    }

    handleHints = () => {
        if(this.state.hints > 0) {
            const options = Array.from(document.querySelectorAll('.option'));
            let indexOfAnswer;
    
            options.forEach((option, index) => {
                if(option.innerHTML.toLowerCase() === this.state.answer.toLowerCase()) {
                    indexOfAnswer = index;
                }
            });
            while(true) {
                const randomNumber = Math.round(Math.random() * 3);
                if(randomNumber !== indexOfAnswer && !this.state.previousRandomNumbers.includes(randomNumber)) {
                    options.forEach((option, index) => {
                        if(index === randomNumber) {
                            option.style.visibility = 'hidden';
                            this.setState((prevState) => ({
                                hints: prevState.hints - 1,
                                previousRandomNumbers: prevState.previousRandomNumbers.concat(randomNumber)
                            }));
                        }
                    });
                    break;
                }
                if(this.state.previousRandomNumbers.length >= 3) break;
            }
        }
        else if(this.state.hints === 0) {
            M.toast({
                html: "You don't have any hints left.",
                classes: 'toast-hint',
                displayLength: 1500
            });
        }
    };

    handleFiftyFifty = () => {
        if(this.state.fiftyFifty > 0 && this.state.usedFiftyFifty === false) {
            const options = document.querySelectorAll('.option');
            const randomNumbers = [];
            let indexOfAnswer;

            options.forEach((option, index) => {
                if(option.innerHTML.toLowerCase() === this.state.answer.toLowerCase()) {
                    indexOfAnswer = index;
                }
            });
            let count = 0;
            do {
                const randomNumber = Math.round(Math.random() * 3);
                if(randomNumber !== indexOfAnswer) {
                    if(randomNumbers.length < 2 && !randomNumbers.includes(randomNumber) && !randomNumbers.includes(indexOfAnswer)) {
                        randomNumbers.push(randomNumber);
                        count ++;
                    }
                    else {
                        while(true) {
                            const newRandomNumber = Math.round(Math.random() * 3);
                            if(!randomNumbers.includes(newRandomNumber) && !randomNumbers.includes(indexOfAnswer)) {
                                randomNumbers.push(newRandomNumber);
                                count++;
                                break;
                            }
                        }
                    }
                }
            }
            while(count < 2);
            options.forEach((option, index) => {
                if(randomNumbers.includes(index)) {
                    option.style.visibility = 'hidden';
                }
            });
            this.setState(prevState => ({
                fiftyFifty: prevState.fiftyFifty - 1,
                usedFiftyFifty: true
            }));
        }
        else if(this.state.fiftyFifty === 0) {
            M.toast({
                html: "You don't have more 50/50s left.",
                classes: 'fiftyFifty-toast',
                displayLength: 1500
            });
        }
    };

    startTimer = () => {
        const countdownTime = Date.now() + 120000;
        this.interval = setInterval(() => {
            const now = new Date();
            const distance = countdownTime - now;
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / (1000));
            if(distance < 0) {
                clearInterval(this.interval);
                this.setState({
                    time: {
                        minutes: 0,
                        seconds: 0
                    }
                }, () => {
                    this.endGame();
                });
            }
            else {
                this.setState({
                    time: {
                        minutes,
                        seconds
                    }
                });
            }
        }, 1000);
    };

    handleDisableButton = () => {
        if(this.state.previousQuestion === undefined || this.state.currentQuestionIndex === 0) {
            this.setState({
                previousButtonDisabled: true
            });
        }
        else {
            this.setState({
                previousButtonDisabled: false
            });
        }

        if(this.state.nextQuestion === undefined || this.state.currentQuestionIndex + 1 === this.state.numberOfQuestions) {
            this.setState({
                nextButtonDisabled: true
            });
        }
        else {
            this.setState({
                nextButtonDisabled: false
            });
        }
    };

    endGame = () => {
     /*   alert("Game has ended.");*/
        const { state } = this;
        const playerStats = {
            score: state.score,
            numberOfQuestions: state.numberOfQuestions,
            numberOfAnsweredQuestions: state.correctAnswers + state.wrongAnswers,
            numberOfUnansweredQuestions: 5 - state.correctAnswers - state.wrongAnswers,
            correctAnswers: state.correctAnswers,
            wrongAnswers: 5 - state.correctAnswers,
            fiftyFiftyUsed: 2 - state.fiftyFifty,
            hintsUsed: 5- state.hints
        };
        console.log(playerStats);
        setTimeout(() => {
            this.props.history.push('/exam/Chemistry/QuizSummary', playerStats);
        }, 1000);
    };
    render() {

        const { 
            currentQuestion,
            currentQuestionIndex, 
            numberOfQuestions, 
            hints, 
            fiftyFifty, 
            time 
        } = this.state;
        return (
            <div>
                <Fragment>
                    <Helmet>
                        <title>
                            Quiz - Quiz App
                        </title>
                    </Helmet>
                    <Fragment>
                        <audio ref={this.correctSound} src={correctNotification}></audio>
                        <audio ref={this.wrongSound} src={wrongNotification}></audio>
                        <audio ref={this.buttonSound} src={buttonNotification}></audio>
                    </Fragment>
                    <div className="questions">
                        <h2>Quiz Mode</h2>
                        <div className="lifeline-container">
                            <p>
                                <span onClick={this.handleFiftyFifty} className="mdi mdi-set-center mdi-24px lifeline-icon">
                                    <span className="lifeline">{fiftyFifty}</span>
                                </span>
                            </p>
                            <p>
                                <span onClick={this.handleHints} className="mdi mdi-lightbulb-on-outline mdi-24px lifeline-icon">
              			<span className="lifeline">{hints}</span>
                                </span>
                            </p>
                        </div>
                        <div className="timer-container">
                            <p>
                                <span className="left" style={{ float: 'left' }}>{currentQuestionIndex + 1} of {numberOfQuestions}</span>
                                <span className="right">{time.minutes}:{time.seconds}<span className="mdi mdi-clock-outline mdi-24px lifeline-icon"></span></span>
                            </p>
                        </div>
                        <h5 style={{WebkitUserSelect:"none",WebkitTouchCallout:"none",MozUserSelect:"none",MsUserSelect:"none",UserSelect:"none"}}>{currentQuestion.question}</h5>
			<div style={{textAlign:"center"}}> <img style={{WebkitUserSelect:"none",WebkitTouchCallout:"none",MozUserSelect:"none",MsUserSelect:"none",UserSelect:"none",width:"20%",height:"10%"}} src={images[currentQuestionIndex+1]}/></div>
                        <div className="options-container">
                            <button onClick={this.handleOptionClick} id="Button" className="option" style={{WebkitUserSelect:"none",WebkitTouchCallout:"none",MozUserSelect:"none",MsUserSelect:"none",UserSelect:"none"}}>{currentQuestion.optionA}</button>
                            <button onClick={this.handleOptionClick} id="Button" className="option" style={{WebkitUserSelect:"none",WebkitTouchCallout:"none",MozUserSelect:"none",MsUserSelect:"none",UserSelect:"none"}}>{currentQuestion.optionB}</button>
                        </div>
                        <div className="options-container">
                            <button onClick={this.handleOptionClick} id="Button" className="option" style={{WebkitUserSelect:"none",WebkitTouchCallout:"none",MozUserSelect:"none",MsUserSelect:"none",UserSelect:"none"}}>{currentQuestion.optionC}</button>
                            <button onClick={this.handleOptionClick} id="Button" className="option" style={{WebkitUserSelect:"none",WebkitTouchCallout:"none",MozUserSelect:"none",MsUserSelect:"none",UserSelect:"none"}}>{currentQuestion.optionD}</button>
                        </div>
                        <div className="button-container">
			    <button id="first" onClick={this.handleButtonClick}>
                                     First
                             </button>
                            <button
                                className={classnames('', {'disabled': this.state.previousButtonDisabled})} 
                                id="previous-button" 
                                onClick={this.handleButtonClick}>
                                    Previous
                            </button>
                            <button
                                className={classnames('', {'disabled': this.state.nextButtonDisabled})} 
                                id="next-button" 
                                onClick={this.handleButtonClick}>
                                    Next
                            </button>
			    <button
                                 id="last"
				  style={{backgroundColor:"#118000"}}
                                 onClick={this.handleButtonClick}>
                                    Last
                             </button>
                            <button 
                                id="quit-button" 
				style={{backgroundColor:"brown"}}
                                onClick={this.handleButtonClick}>
                                    Quit
                            </button>
			    <button
                                 id="submit"
                                 style={{backgroundColor:"grey"}}
                                 onClick={this.handleButtonClick}>
                                    Submit
                             </button>
                        </div>
                    </div>
                </Fragment>
		<div className="questions">
			<h5><b> Quiz Navigation</b> </h5>
			<button className="btn"  id="q1"
                                onClick={this.handleButtonClick}>
                                Q1
                        </button>
		        &nbsp;&nbsp;&nbsp;&nbsp;
			<button className="btn"  id="q2"
                                onClick={this.handleButtonClick}>
                                Q2
                        </button>
		        &nbsp;&nbsp;&nbsp;&nbsp;
			<button className="btn" id="q3"
                                onClick={this.handleButtonClick}>
                                       Q3
                        </button>
		        &nbsp;&nbsp;&nbsp;&nbsp;
			<button className="btn"  id="q4"
                                onClick={this.handleButtonClick}>
                                       Q4
                        </button>
		        &nbsp;&nbsp;&nbsp;&nbsp;
			<button className="btn"  id="q5"
                                onClick={this.handleButtonClick}>
                                       Q5
                        </button>
		</div>
            </div>
        )
    }
}

export default Quiz
