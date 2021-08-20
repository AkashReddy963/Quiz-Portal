import React, { Component, Fragment } from 'react'
import Helmet from 'react-helmet';
import { Link } from 'react-router-dom';

export class QuizSummary extends Component {

    constructor(props) {
        super(props);
        this.state = {
            score: 0,
            numberOfQuestions: 0,
            numberOfAnsweredQuestions: 0,
            numberOfUnansweredQuestions: 0,
            correctAnswers: 0,
            wrongAnswers: 0,
            hintsUsed: 0,
            fiftyFiftyUsed: 0
        };
    }

    componentDidMount() {
        const { state } = this.props.location;
        if(state) {
            this.setState({
                score: (state.score / state.numberOfQuestions) * 100,
                numberOfQuestions: state.numberOfQuestions,
                numberOfAnsweredQuestions: state.numberOfAnsweredQuestions,
                numberOfUnansweredQuestions: state.numberOfUnansweredQuestions,
                correctAnswers: state.correctAnswers,
                wrongAnswers: state.wrongAnswers,
                hintsUsed: state.hintsUsed,
                fiftyFiftyUsed: state.fiftyFiftyUsed
            });
        } 
    };

    render() {
        
        const { state, score } = this.props.location;
        let stats, remark;
        const userScore = this.state.score;
        
        if(userScore <= 30) {
            remark = "You need more practice.";
        }
        else if(userScore > 30 && userScore <= 50) {
            remark = "Better luck next time.";   
        }
        else if(userScore <= 70 && userScore > 50) {
            remark = "You can do better.";
        }
        else if(userScore <= 71 && userScore <= 84) {
            remark = "You did great.";
        }
        else {
            remark = "You are an absolute genius.";
        }

        if(state !== undefined) {
            stats = (
                <Fragment>
                    <div >
                        <span className="mdi mdi-check-circle-outline primary-icon"></span>
                    </div>
                    <h1>Quiz has ended!</h1>
                    <div className="container">

                        <h4>{remark}</h4>
                        <h2>Your Score: {this.state.score.toFixed(0)}&#37;</h2>
                        <span className="stat left">Total number of questions: </span>
                        <span className="right">{this.state.numberOfQuestions}</span><br/>

                        <span className="stat left">Total number of attempted questions:</span>
                        <span className="right">{this.state.numberOfAnsweredQuestions}</span><br/>
                    
                        <span className="stat left">Total number of unattempted questions:</span>
                        <span className="right">{this.state.numberOfUnansweredQuestions}</span><br/>

                        <span className="stat left">Total number of correct answers:</span>
                        <span className="right">{this.state.correctAnswers}</span><br/>

                        <span className="stat left">Total number of wrong answers:</span>
                        <span className="right">{this.state.wrongAnswers}</span><br/>

                        <span className="stat left">Total number of used hints: </span>
                        <span className="right">{this.state.hintsUsed}</span><br/>

                        <span className="stat left">Total number of 50/50 used: </span>
                        <span className="right">{this.state.fiftyFiftyUsed}</span><br/>

                    </div>
                    <section className="links">
                        <ul>
                            <li>
                                <Link to="/Examlist" className="button-link-bth">End Quiz / Back to home?</Link>
                                <Link to="/exam/Social/quiz" className="button-link-pa">Do quiz again?</Link>
                            </li>
                        </ul>
                    </section>
                </Fragment>
            );
        }
        else {
            stats = (
                <section>
                    <h1 className="no-stats">No Statistics Available</h1>
                    <ul>
                        <li>
                            <Link to="/Examlist">End Quiz/ Back to home?</Link>
                        </li>
                        <li>
                            <Link to="/exam/Social/quiz">Start Quiz?</Link>
                        </li>
                    </ul>
                </section>
            );
        }

        return (
            <Fragment>
                <Helmet><title>Quiz Summary - Quiz App</title></Helmet>
                {stats}
            </Fragment>
        )
    }
}

export default QuizSummary