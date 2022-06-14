import React from "react";
import { useAuth } from "../components/AuthContext";

function AuthForm({ onSubmit, submitMessage }) {
  const [state, setState] = React.useState({ email: "", password: "" });

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setState({ ...state, [name]: value });
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    onSubmit(state);
  };
  return (
    <div className="AuthForm" >
      <form
        onSubmit={handleSubmit} 
      >
        <div>
          <label htmlFor="email">Email</label>
          <br/>
          <input
            required
            name="email"
            type="email"
            value={state.email}
            onChange={handleChange}
            style={{padding:"5px", margin:"10px"}} 
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <br/>
          <input
            required
            name="password"
            type="password"
            autoComplete="on"
            value={state.password}
            onChange={handleChange}
            style={{padding:"5px", margin:"10px"}} 
          />
        </div>

        <button style={{width:"110px", padding:"5px", margin:"10px"}} type="submit">{submitMessage}</button>
      </form>
    </div>
  );
}

function Auth({ isLogin }) {
  const { handleLogin, handleSignup } = useAuth();
  const onSubmit = isLogin ? handleLogin : handleSignup;
  const submitMessage = isLogin ? "Login" : "Signup";
console.log("on submit",onSubmit)
  return (
    <div>
      <AuthForm submitMessage={submitMessage} onSubmit={onSubmit} />
    </div>
  );
}

export default Auth;
