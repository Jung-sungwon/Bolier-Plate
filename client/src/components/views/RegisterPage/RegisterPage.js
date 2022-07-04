import React, { useState } from "react"
import { useDispatch } from "react-redux"
import { registerUser } from "../../../_actions/user_action"
import { useNavigate } from "react-router-dom"
import Auth from "../../../hoc/auth"

function RegisterPage(props) {
  const navigate = useNavigate()

  const dispatch = useDispatch()

  const [Email, setEmail] = useState("")
  const [Password, setPassword] = useState("")
  const [Name, setName] = useState("")
  const [ConfirmPassword, setConfirmPassword] = useState("")

  const onEmailHandler = (e) => {
    setEmail(e.target.value)
  }
  const onNameHandler = (e) => {
    setName(e.target.value)
  }
  const onPasswordHandler = (e) => {
    setPassword(e.target.value)
  }
  const onConfirmPasswordHandler = (e) => {
    setConfirmPassword(e.target.value)
  }
  const onSubmitHandler = (e) => {
    e.preventDefault()

    if (Password !== ConfirmPassword) {
      return alert("패스워드를 확인해주세요.")
    }

    let body = {
      email: Email,
      name: Name,
      password: Password,
    }

    dispatch(registerUser(body)).then((response) => {
      if (response.payload.success) {
        navigate("/login")
      } else {
        alert("Failed to sign Up!")
      }
    })
  }

  Auth(false)

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
      <form
        style={{ display: "flex", flexDirection: "column" }}
        onSubmit={onSubmitHandler}
      >
        <label>Email</label>
        <input type="email" value={Email} onChange={onEmailHandler} />

        <label>Name</label>
        <input type="text" value={Name} onChange={onNameHandler} />

        <label>Password</label>
        <input type="password" value={Password} onChange={onPasswordHandler} />

        <label>Confirm Password</label>
        <input
          type="password"
          value={ConfirmPassword}
          onChange={onConfirmPasswordHandler}
        />
        <br />
        <button>회원가입</button>
      </form>
    </div>
  )
}

export default RegisterPage
