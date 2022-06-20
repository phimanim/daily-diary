import React from "react";
import { useAuth } from "../components/AuthContext";
import styled from "styled-components";
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

  const Button = styled.button`
  padding: 0.5em;
  margin: 1em;
  width: 200px;
  border: 3px solid var(--border-color);
  border-radius: 5px;
  font-size: inherit;
  text-align: center; 
  `
  const Input = styled.input`
  padding: 0.5em;
  margin: 1em 0;

  `
  return (
    <div className="AuthForm" style={{height: "70vh", display:"flex", alignItems:"center", flexDirection:"column"}} >
      <form
        onSubmit={handleSubmit} 
      >
        <div style={{padding:"5px", margin:"10px 0"}} >
          <label htmlFor="email">Email</label>
          <br/>
          <Input
            required
            name="email"
            type="email"
            value={state.email}
            onChange={handleChange}
          />
        </div>
        <div style={{padding:"5px", margin:"10px 0"}} >
          <label htmlFor="password">Password</label>
          <br/>
          <Input
            required
            name="password"
            type="password"
            autoComplete="on"
            value={state.password}
            onChange={handleChange}
          />
        </div>

        <Button style={{width:"100%", padding:"5px", margin:"15px 0"}} type="submit">{submitMessage}</Button>
      </form>
    </div>
  );
}

function Auth({ isLogin }) {
  const { handleLogin, handleSignup } = useAuth();
  const onSubmit = isLogin ? handleLogin : handleSignup;
  const submitMessage = isLogin ? "Login" : "Signup";
  return (
    <div>
      <AuthForm submitMessage={submitMessage} onSubmit={onSubmit} />
    </div>
  );
}

export default Auth;
