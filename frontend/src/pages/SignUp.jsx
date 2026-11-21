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
  const handleSignUp = async e => {
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
        password: password
      });

      //Handle succussful register response
      if (response.data && response.data.error) {
        setError(response.data.message);
        return;
      }
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
  return <AuthLayout isSignUp>
      <form className="[&_h1]:text-[30px] [&_h1]:leading-[1.2] [&_h1]:tracking-[-1px] [&_h1]:font-bold max-[480px]:[&_h1]:text-[28px]" onSubmit={handleSignUp} aria-busy={isSubmitting}>
        <span className="w-[46px] h-[46px] grid place-items-center bg-soft text-primary border border-border rounded-[13px] text-[23px] mb-[21px]"><Icon name="journal-plus" /></span>
        <h1>Your fresh start.</h1>
        <p className="text-muted text-[15px] leading-[1.7] mt-2.5 mx-0 mb-[27px]">Create your account and give your ideas a home.</p>
          <div className="form-field">
            <label htmlFor="signup-name">Full name</label>
            <input id="signup-name" type="text" autoComplete="name" placeholder="Your name" value={name} onChange={e => setName(e.target.value)} required />
          </div>
        <div className="form-field">
          <label htmlFor="signup-email">Email address</label>
          <input id="signup-email" type="email" autoComplete="email" placeholder="you@example.com" value={email} onChange={e => setEmail(e.target.value)} required />
        </div>
        <div className="form-field">
          <label htmlFor="signup-password">Password</label>
          <PasswordInput id="signup-password" autoComplete="new-password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Create a password" required />
        </div>
        {error && <p className="form-error" role="alert">{error}</p>}
        <button type="submit" className="button-primary block w-full mt-2 text-[15px]" disabled={isSubmitting}>
          {isSubmitting ? "Creating your account…" : "Create account"}
        </button>
        <p className="border-t border-border pt-[22px] mt-[26px] text-center text-[14px] text-muted leading-[1.8] [&_a]:text-primary [&_a]:font-semibold [&_a:hover]:underline">Already have an account?{" "}<Link to="/login">Log in</Link></p>
      </form>
    </AuthLayout>;
};
export default SignUp;
