// ❗ You don't need to add extra reducers to achieve MVP
import { combineReducers } from 'redux'

import { 
  MOVE_CLOCKWISE, 
  MOVE_COUNTERCLOCKWISE, 
  SET_SELECTED_ANSWER, 
  SET_INFO_MESSAGE, 
  SET_QUIZ_INTO_STATE, 
  INPUT_CHANGE, 
  RESET_FORM 
} from "./action-types"

const initialWheelState = 0

function wheel(state = initialWheelState, action) {
  switch (action.type) {
    case MOVE_CLOCKWISE:
      if(state===5) return (0);
      return (state+1);
    case MOVE_COUNTERCLOCKWISE:
      if(state===0) return (5);
      return (state-1);
    default:
      return state;
  }
}

const initialQuizState = null

function quiz(state = initialQuizState, action) {
  switch (action.type) {
    case SET_QUIZ_INTO_STATE:
      return (action.payload);
    default:
      return state;
  }
}

const initialSelectedAnswerState = null

function selectedAnswer(state = initialSelectedAnswerState, action) {
  switch(action.type) {
    case SET_SELECTED_ANSWER:
      return (action.payload);
    default:
      return state;
  }
  
}

const initialMessageState = ''

function infoMessage(state = initialMessageState, action) {
  switch(action.type) {
    case SET_INFO_MESSAGE:
      return (action.payload);
    default:
      return state;
  }
}

const initialFormState = {
  newQuestion: '',
  newTrueAnswer: '',
  newFalseAnswer: '',
  disabled: true
}

function form(state = initialFormState, action) {
  switch(action.type) {
    case INPUT_CHANGE:
      const target = action.payload.target;
      let newState = {};
      switch(target.id) {
        case("newQuestion") :
          newState = {...state, newQuestion: target.value};
          break;
        case("newTrueAnswer"):
          newState = {...state, newTrueAnswer: target.value};
          break;
        case("newFalseAnswer"):
          newState = {...state, newFalseAnswer: target.value};
          break;
        default: (console.error("Form on which value changed occured doesn't have valid ID."))
      }
      return {
        ...newState, 
        disabled: 
        (!(
          newState.newQuestion.trim() && 
          newState.newTrueAnswer.trim() && 
          newState.newFalseAnswer.trim()
        ))};
    case RESET_FORM:
      return initialFormState;
    default:
      return state;
  }
}

export default combineReducers({ wheel, quiz, selectedAnswer, infoMessage, form })
