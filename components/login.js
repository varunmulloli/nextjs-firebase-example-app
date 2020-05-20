import React from 'react';
import loginHandler from '../utils/loginHandler';

const Login = () => {
  const [emailValue, setEmailValue] = React.useState("");
  const [passwordValue, setPasswordValue] = React.useState("");

  return (
    <div>
      <form>
        <label htmlFor="login_email">Email</label>
        <input type="email" placeholder="Email" id="login_email" 
          value={emailValue} onChange={e => setEmailValue(e.target.value)} 
        />

        <label htmlFor="login_password">Password</label>
        <input type="password"  placeholder="Password" id="login_password"
          value={passwordValue} onChange={e => setPasswordValue(e.target.value)}  
        />

        <button type="submit" 
          onClick={e => { e.preventDefault(); loginHandler(emailValue, passwordValue); } }
        >
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;