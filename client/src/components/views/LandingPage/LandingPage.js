import React, { useEffect } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import Auth from "../../../hoc/auth"

function LandingPage(props) {
  const navigate = useNavigate()
  useEffect(() => {
    //포스트맨으로 데이터를 보내는 것처럼 axios로 데이터를 보내줌
    axios
      .get("/api/hello") //react는 3000번 포트인데 데이터를 보내는 백엔드는 5000번 포트라 오류가 뜸, 그걸 해결하기 위해서 proxy서버 이용
      .then((response) => console.log(response))
  }, [])
  console.log("랜딩페이지ㅎ")
  const onClickHandler = () => {
    axios.get("api/users/logout").then((response) => {
      if (response.data.success) {
        navigate("/login")
      } else {
        alert("err")
      }
    })
  }

  Auth(null)

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100vh",
      }}
    >
      <h1>시작 페이지</h1>
      <button onClick={onClickHandler}>로그아웃</button>
    </div>
  )
}

export default LandingPage
