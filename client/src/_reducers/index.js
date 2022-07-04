import { combineReducers } from "redux"
import user from "./user_reducer"

const rootReducer = combineReducers({
  user,
})

export default rootReducer
//combineReducers는 리듀서들을 합쳐준다.
