import { useDispatch } from "react-redux";
import * as sessionActions from "../../store/session";

const DemoUserLoginButton = ({ onClick }) => {
  const dispatch = useDispatch();

  const loginDemoUser = () => {
    dispatch(sessionActions.thunkCreateSession({
      credential: "User1",
      password: "user1 password"
    }));
    if (onClick) onClick();
  }

  return (
    <button type="submit" onClick={loginDemoUser}>
      Log In as Demo User
    </button>
  )
}

export default DemoUserLoginButton;