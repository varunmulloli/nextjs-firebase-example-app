import React from 'react';
import loginHandler from '../handlers/loginHandler';

import * as theme from '../theme';

const handleLoginFormSubmit = (email, password) => event => {
  event.preventDefault(); 
  loginHandler(email, password);
}

const Login = () => {
  const [emailValue, setEmailValue] = React.useState("");
  const [passwordValue, setPasswordValue] = React.useState("");

  return (
    <>
      <div className="loginContainer">
        <h1>Sign In</h1>

        <form onSubmit={handleLoginFormSubmit(emailValue, passwordValue)}>
          <div className="formGroup">
            <label htmlFor="login_email">Email</label>
            <br />
            <input type="email" placeholder="Email" id="login_email" 
              value={emailValue} onChange={e => setEmailValue(e.target.value)} 
            />
          </div>
          
          <div className="formGroup">
            <label htmlFor="login_password">Password</label>
            <br />
            <input type="password"  placeholder="Password" id="login_password"
              value={passwordValue} onChange={e => setPasswordValue(e.target.value)}  
            />
          </div>
          
          <div className="formGroup submit">
            <button type="submit" title="Login">Sign In</button>
          </div>
        </form>
      </div>

      <style jsx>{`
        .loginContainer {
          width: 500px;
          margin: ${theme.margin4x} auto;
          background: ${theme.colors.foreground};
          padding: ${theme.padding1x} ${theme.margin1x};
        }

        .formGroup {
          margin-bottom: ${theme.margin1x};
        }

        .formGroup.submit {
          padding-top: ${theme.padding1x};
        }

        label {
          font-size: 12px;
        }

        input {
          height: 32px;
          width: 100%;
          padding: 8px;
          border: 1px solid #ced4da;
          border-radius: 5px;
          outline: none;
          box-sizing: border-box;
        }

        input:focus {
          color: #495057;
          background-color: #fff;
          border-color: #80bdff;
          outline: 0;
          box-shadow: 0 0 0 2px rgba(0,123,255,.25);
        }

        button {
          background: #007bff;
          color: ${theme.colors.textInvert};
          border: 1px solid #007bff;
          border-radius: 5px;
          padding: 8px 16px;
          cursor: pointer;
        }

        button:hover {
          background-color: #0069d9;
          border-color: #0062cc;
        }
      `}</style>
    </>
  );
}

export default Login;