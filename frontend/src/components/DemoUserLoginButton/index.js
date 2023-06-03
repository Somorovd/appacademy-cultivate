import { useDispatch } from "react-redux";
import * as sessionActions from "../../store/session";

const DemoUserLoginButton = () => {
  const dispatch = useDispatch();

  const loginDemoUser = () => {
    dispatch(sessionActions.thunkCreateSession({
      credential: "User1",
      password: "user1 password"
    }));
  }

  return (
    <button onClick={loginDemoUser}>
      Demo User
    </button>
  )
}

export default DemoUserLoginButton;