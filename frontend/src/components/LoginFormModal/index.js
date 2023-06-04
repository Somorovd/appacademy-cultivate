import React, { useState, useEffect } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";
import DemoUserLoginButton from "../DemoUserLoginButton";

const LoginFormModal = () => {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [validationErrors, setValidationErrors] = useState({});
  const [isEnabled, setIsEnabled] = useState(false);
  const { closeModal } = useModal();

  useEffect(() => {
    setIsEnabled(
      (credential && credential.length >= 4) &&
      (password && password.length >= 6)
    );
  }, [credential, password])

  if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = (e) => {
    e.preventDefault();
    setValidationErrors({});
    closeModal();
  };

  const logIn = () => {
    return dispatch(sessionActions.thunkCreateSession({ credential, password }))
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) setValidationErrors(data.errors);
      });
  }

  return (
    <div className="login-modal">
      <h1>Log In</h1>
      {validationErrors.credential && <p className="error">{validationErrors.credential}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username or Email"
          value={credential}
          onChange={(e) => setCredential(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button
          type="submit"
          disabled={!isEnabled}
          onClick={logIn}
        >
          Log In
        </button>
      </form>
      <DemoUserLoginButton onClick={closeModal} />
    </div>
  );
}

export default LoginFormModal;