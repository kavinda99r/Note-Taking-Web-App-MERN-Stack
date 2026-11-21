import { useState } from "react";
import AuthLayout from "../components/AuthLayout";
import Icon from "../components/Icon";
import { Link, useLocation, useNavigate } from "react-router-dom";
import PasswordInput from "../components/PasswordInput";
import { validateEmail } from "../utils/helper";
import axiosInstance from "../utils/axiosInstance";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const {
    state
  } = useLocation();
  const handleLogin = async e => {
    e.preventDefault();
    if (isSubmitting) return;
    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    if (!password) {
      setError("Please enter the password.");
      return;
    }
    setError("");

    //Login API call
    setIsSubmitting(true);
    try {
      const response = await axiosInstance.post("/login", {
        email: email,
        password: password
      });

      //Handle succussful login response
      if (response.data && response.data.user) {
        navigate("/dashboard", {
          replace: true
        });
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };
  return <AuthLayout>
      <form className="[&_h1]:text-[30px] [&_h1]:leading-[1.2] [&_h1]:tracking-[-1px] [&_h1]:font-bold max-[480px]:[&_h1]:text-[28px]" onSubmit={handleLogin} aria-busy={isSubmitting}>
        <span className="w-[46px] h-[46px] grid place-items-center bg-soft text-primary border border-border rounded-[13px] text-[23px] mb-[21px]"><Icon name="journal-bookmark" /></span>
        <h1>Welcome back.</h1>
        {state?.notice && <p className="my-3.5 py-2.5 px-3 border border-border rounded-[8px] text-primary bg-soft text-[14px] leading-[1.7]" role="status">{state.notice}</p>}
        <p className="text-muted text-[15px] leading-[1.7] mt-2.5 mx-0 mb-[27px]">Your ideas are right where you left them.</p>
        <div className="form-field">
          <label htmlFor="login-email">Email address</label>
          <input id="login-email" type="email" autoComplete="email" placeholder="you@example.com" value={email} onChange={e => setEmail(e.target.value)} required />
        </div>
        <div className="form-field">
          <label htmlFor="login-password">Password</label>
          <PasswordInput id="login-password" autoComplete="current-password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Enter your password" required />
        </div>
        {error && <p className="form-error" role="alert">{error}</p>}
        <button type="submit" className="button-primary block w-full mt-2 text-[15px]" disabled={isSubmitting}>
          {isSubmitting ? "Logging in…" : "Log in"}
        </button>
        <p className="border-t border-border pt-[22px] mt-[26px] text-center text-[14px] text-muted leading-[1.8] [&_a]:text-primary [&_a]:font-semibold [&_a:hover]:underline">New here?{" "}<Link to="/signup">Create an account</Link></p>
      </form>
    </AuthLayout>;
};
export default Login;
