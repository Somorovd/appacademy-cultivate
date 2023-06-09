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
      (credential.length >= 4) &&
      (password.length >= 6)
    );
  }, [credential, password])

  if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = (e) => {
    e.preventDefault();
    setValidationErrors({});
  };

  const logIn = () => {
    return dispatch(sessionActions.thunkCreateSession({ credential, password }))
      .then(closeModal)
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) setValidationErrors(data.errors);
      });
  }

  return (
    <div className="login-modal">
      <form
        className="modal-form"
        onSubmit={handleSubmit}
      >
        <h1>Log In</h1>
        {validationErrors.credential && <p className="error">{validationErrors.credential}</p>}
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
          onClick={logIn}
          disabled={!isEnabled}
        >
          <span>
            Log In
          </span>
        </button>
        <DemoUserLoginButton onClick={closeModal} />
      </form>
    </div >
  );
}

export default LoginFormModal;