import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faLock} from "@fortawesome/free-solid-svg-icons";
import {isLoggedIn, tryLogin} from "./privateLogin";
import {ThemeToggleButton} from "../theme";
import terms from "../terms.json";
import "../css/login.scss";

export const LoginGate = ({children}) => {
  const [loggedIn, setLoggedIn] = React.useState(isLoggedIn);
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState(false);

  if (loggedIn) {
    return children;
  }

  const onSubmit = (event) => {
    event.preventDefault();
    if (tryLogin(username, password)) {
      setLoggedIn(true);
    } else {
      setError(true);
      setPassword("");
    }
  };

  return (
    <div className="login-page">
      <div className="login-theme-toggle">
        <ThemeToggleButton/>
      </div>
      <form className="login-card" onSubmit={onSubmit}>
        <div className="login-icon">
          <FontAwesomeIcon icon={faLock}/>
        </div>
        <h1>{terms.login_title}</h1>
        <p className="login-description">{terms.login_description}</p>
        <label htmlFor="login-username">{terms.login_username}</label>
        <input
          id="login-username"
          className="form-control"
          autoComplete="username"
          autoCapitalize="none"
          autoCorrect="off"
          spellCheck={false}
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
            setError(false);
          }}
          autoFocus
        />
        <label htmlFor="login-password">{terms.login_password}</label>
        <input
          id="login-password"
          className="form-control"
          type="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            setError(false);
          }}
        />
        {error && <div className="alert alert-danger login-error" role="alert">{terms.login_wrong_credentials}</div>}
        <button type="submit" className="btn btn-primary btn-block login-submit">
          {terms.login_submit}
        </button>
      </form>
    </div>
  );
};
