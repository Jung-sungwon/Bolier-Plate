import React from "react"
import ReactDOM from "react-dom/client"
import "./index.css"
import App from "./App"
import { Provider } from "react-redux"
import "antd/dist/antd.css"
//import { applyMiddleware } from "redux" / configureStore에서는 applyMiddleware가 기본적으로 내장되어있음.
import promiseMiddleware from "redux-promise"
import ReduxThunk from "redux-thunk"
import { configureStore } from "@reduxjs/toolkit"
import Reducer from "./_reducers/index"

const middlewares = [promiseMiddleware, ReduxThunk]

const createStoreWithMiddleware = configureStore({
  reducer: Reducer,
  middleware: [...middlewares],
  devTools: process.env.NODE_ENV !== "production",
})

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
  <Provider store={createStoreWithMiddleware}>
    <App />
  </Provider>
)

//Provider는 react와 redux를 연결시킨다.

// store={createStoreWithMiddleware({
//     Reducer,
//     devTools:
//       window.__REDUX_DEVTOOLS_EXTENSION__ &&
//       window.__REDUX_DEVTOOLS_EXTENSION__(), //크롬 확장 redux devtools와 연결함
//   })}

//const store = configureStore()

// const createStoreWithMiddleware = applyMiddleware(
//   promiseMiddleware,
//   ReduxThunk
// )(configureStore)
