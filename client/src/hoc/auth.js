import { useDispatch } from "react-redux"
import { auth } from "../_actions/user_action"
import { useNavigate } from "react-router-dom"

export default function _auth(option, adminRoute = null) {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  dispatch(auth()).then((response) => {
    console.log(response)

    //로그인 하지  않은 상태
    if (!response.payload.isAuth) {
      if (option) {
        navigate("/")
      }
    } else {
      //로그인 한 상태
      if (adminRoute && !response.payload.isAdmin) {
        navigate("/")
      } else {
        if (option === false) {
          navigate("/")
        }
      }
    }
  })
}
