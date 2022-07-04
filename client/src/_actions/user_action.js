import axios from "axios"
import { REGISTER_USER, AUTH_USER, LOGIN_USER } from "./types"

export function loginUser(dataTosubmit) {
  const request = axios
    .post("/api/users/login", dataTosubmit)
    .then((response) => response.data)

  return {
    type: LOGIN_USER,
    payload: request,
  }
}
//여기서는 액션을 설정하고 이 액션을 리듀서에 날려줄거임

export function registerUser(dataTosubmit) {
  const request = axios
    .post("/api/users/register", dataTosubmit)
    .then((response) => response.data)

  return {
    type: REGISTER_USER,
    payload: request,
  }
}

export function auth() {
  const request = axios.get("/api/users/auth").then((response) => response.data)

  return {
    type: AUTH_USER,
    payload: request,
  }
}
