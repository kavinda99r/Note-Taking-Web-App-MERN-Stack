import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "../components/AuthLayout";
import Icon from "../components/Icon";
import PasswordInput from "../components/PasswordInput";
import axiosInstance from "../utils/axiosInstance";
import { validateEmail } from "../utils/helper";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;

    if (!name.trim()) {
      setError("Please enter your name");
      return;
    }
    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }
    if (!password) {
      setError("Please enter the password");
      return;
    }

    setError("");

    //Signup API call
    setIsSubmitting(true);
    try {
      const response = await axiosInstance.post("/create-account", {
        fullName: name,
        email: email,
        password: password,
      });

      //Handle succussful register response
      if (response.data && response.data.error) {
        setError(response.data.message);
        return;
      }

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
    <AuthLayout isSignUp>
      <form className="auth-form" onSubmit={handleSignUp} aria-busy={isSubmitting}>
        <span className="auth-form-icon"><Icon name="journal-plus" /></span>
        <h1>Your fresh start.</h1>
        <p className="auth-form-description">Create your account and give your ideas a home.</p>
          <div className="form-field">
            <label htmlFor="signup-name">Full name</label>
            <input id="signup-name" type="text" autoComplete="name" placeholder="Your name" value={name} onChange={(e) => setName(e.target.value)} required />
          </div>
        <div className="form-field">
          <label htmlFor="signup-email">Email address</label>
          <input id="signup-email" type="email" autoComplete="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div className="form-field">
          <label htmlFor="signup-password">Password</label>
          <PasswordInput id="signup-password" autoComplete="new-password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Create a password" required />
        </div>
        {error && <p className="form-error" role="alert">{error}</p>}
        <button type="submit" className="button-primary auth-submit" disabled={isSubmitting}>
          {isSubmitting ? "Creating your account…" : "Create account"}
        </button>
        <p className="auth-form-switch">Already have an account?{" "}<Link to="/login">Log in</Link></p>
      </form>
    </AuthLayout>
  );
};

export default SignUp;
