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
  const { state } = useLocation();

  const handleLogin = async (e) => {
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
        password: password,
      });

      //Handle succussful login response
      if (response.data && response.data.user) {

        navigate("/dashboard", { replace: true });
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setError(error.response.data.message);
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AuthLayout>
      <form className="auth-form" onSubmit={handleLogin} aria-busy={isSubmitting}>
        <span className="auth-form-icon"><Icon name="journal-bookmark" /></span>
        <h1>Welcome back.</h1>
        {state?.notice && <p className="auth-notice" role="status">{state.notice}</p>}
        <p className="auth-form-description">Your ideas are right where you left them.</p>
        <div className="form-field">
          <label htmlFor="login-email">Email address</label>
          <input id="login-email" type="email" autoComplete="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div className="form-field">
          <label htmlFor="login-password">Password</label>
          <PasswordInput id="login-password" autoComplete="current-password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter your password" required />
        </div>
        {error && <p className="form-error" role="alert">{error}</p>}
        <button type="submit" className="button-primary auth-submit" disabled={isSubmitting}>
          {isSubmitting ? "Logging in…" : "Log in"}
        </button>
        <p className="auth-form-switch">New here?{" "}<Link to="/signup">Create an account</Link></p>
      </form>
    </AuthLayout>
  );
};

export default Login;
