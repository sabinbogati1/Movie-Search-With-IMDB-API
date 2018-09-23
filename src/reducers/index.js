import { combineReducers } from 'redux';
import NoteReducer from "./reducer_note";

const rootReducer = combineReducers({
  note:NoteReducer
});

export default rootReducer;
