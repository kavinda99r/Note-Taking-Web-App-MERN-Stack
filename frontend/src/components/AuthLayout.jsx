import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Icon from "./Icon";
import "../pages/Auth.css";

const AuthLayout = ({ children, isSignUp = false }) => (
  <div className="auth-page">
    <header className="auth-header">
      <Link to="/" className="auth-brand" aria-label="NoteSnap home">
        <span className="auth-brand-icon"><Icon name="journal-text" /></span>
        Note<span>Snap.</span>
      </Link>
      <div className="auth-header-action">
        <span>{isSignUp ? "Already a member?" : "New to NoteSnap?"}</span>
        <Link to={isSignUp ? "/login" : "/signup"}>{isSignUp ? "Log in" : "Get started"}</Link>
      </div>
    </header>
    <main className="auth-main">
      <aside className="auth-intro">
        <span className="auth-eyebrow"><Icon name="stars" /> A little space for your big ideas</span>
        <h2>A clear page.<br /><span>A clearer mind.</span></h2>
        <p>Keep your ideas, everyday reminders, and next big plans together in one thoughtful space.</p>
        <div className="auth-note" aria-label="Example note">
          <div className="auth-note-meta"><span>A NOTE TO YOURSELF</span><Icon name="pin-angle-fill" /></div>
          <h3>Good things start small.</h3>
          <p>Write down the thought.<br />Make a little room.<br />See where it takes you.</p>
          <span className="auth-note-tag">#a-fresh-start</span>
        </div>
        <div className="auth-intro-detail"><Icon name="check2-circle" /> Your thoughts. Your own little place.</div>
      </aside>
      <div className="auth-form-panel">{children}</div>
    </main>
    <footer className="auth-footer"><span>A little more organized. A little more you.</span><Link to="/">Back to home</Link></footer>
  </div>
);

AuthLayout.propTypes = { children: PropTypes.node.isRequired, isSignUp: PropTypes.bool };

export default AuthLayout;
