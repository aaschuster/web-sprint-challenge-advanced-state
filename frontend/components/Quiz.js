import React, {useEffect} from 'react'
import { connect } from "react-redux";
import { fetchQuiz, postAnswer, selectAnswer } from '../state/action-creators'


function Quiz( { fetchQuiz, selectAnswer, quiz, selectedAnswer, postAnswer} ) {
  useEffect(() => {
    fetchQuiz();
  }, [])

  return (
    <div id="wrapper">
      {
        // quiz already in state? Let's use that, otherwise render "Loading next quiz..."
        quiz ? (
          <>
            <h2>{quiz.question}</h2>

            <div id="quizAnswers">
              <div className={`answer${selectedAnswer===0 ? " selected" : ""}`}>
                {quiz.answers[0].text}
                <button onClick={() => selectAnswer(0)}>
                  {selectedAnswer===0 ? "SELECTED" : "Select"}
                </button>
              </div>

              <div className={`answer${selectedAnswer===1 ? " selected" : ""}`}>
                {quiz.answers[1].text}
                <button onClick={() => selectAnswer(1)}>
                  {selectedAnswer===1 ? "SELECTED" : "Select"}
                </button>
              </div>
            </div>

            <button 
              id="submitAnswerBtn" 
              onClick={() => 
                postAnswer(quiz.quiz_id, quiz.answers[selectedAnswer].answer_id)
              }
              disabled={selectedAnswer===null}
            >Submit answer</button>
          </>
        ) : 'Loading next quiz...'
      }
    </div>
  )
}

const mapProps = state => {
  return {
    quiz: state.quiz,
    selectedAnswer: state.selectedAnswer
  }
}

export default connect(mapProps, {fetchQuiz, selectAnswer, postAnswer})(Quiz);