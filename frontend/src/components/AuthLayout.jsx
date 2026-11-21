import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Icon from "./Icon";

const styles = `
.auth-page {
  min-height: 100svh;
  display: flex;
  flex-direction: column;
  background: var(--color-base);
  color: var(--color-ink);
}
.auth-header {
  width: min(1160px, calc(100% - 80px));
  margin-inline: auto;
}
.auth-main {
  width: min(1160px, calc(100% - 80px));
  margin-inline: auto;
}
.auth-footer {
  width: min(1160px, calc(100% - 80px));
  margin-inline: auto;
}
.auth-header {
  min-height: 88px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  border-bottom: 1px solid var(--color-border);
}
.auth-brand {
  display: inline-flex;
  align-items: center;
  font-size: 25px;
  font-weight: 700;
  letter-spacing: -1px;
  color: var(--color-ink);
}
.auth-brand > span:last-child {
  color: var(--color-primary);
}
.auth-brand-icon {
  display: grid;
  place-items: center;
  width: 37px;
  height: 39px;
  margin-right: 10px;
  border-radius: 11px 11px 11px 3px;
  color: white;
  background: var(--color-primary);
  font-size: 21px;
}
.auth-header-action {
  display: flex;
  align-items: center;
  gap: 16px;
  font-size: 14px;
  color: var(--color-muted);
}
.auth-header-action a {
  padding: 10px 17px;
  border: 1px solid var(--color-border);
  border-radius: 8px;
  color: var(--color-primary);
  font-weight: 600;
  background: white;
}
.auth-header-action a:hover {
  background: var(--color-soft);
}
.auth-main {
  flex: 1;
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  gap: 100px;
  padding-block: 48px;
}
.auth-eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  border: 1px solid var(--color-border);
  border-radius: 6px;
  background: var(--color-soft);
  color: var(--color-primary);
  font-size: 13px;
}
.auth-intro > h2 {
  margin: 24px 0 18px;
  font-size: clamp(38px, 4.3vw, 58px);
  font-weight: 700;
  line-height: 1.12;
  letter-spacing: -2.4px;
}
.auth-intro > h2 span {
  color: var(--color-primary);
}
.auth-intro > p {
  max-width: 430px;
  font-size: 17px;
  line-height: 1.8;
  color: var(--color-muted);
}
.auth-note {
  max-width: 355px;
  padding: 25px 28px;
  margin: 30px 0 23px 12px;
  border: 1px solid var(--color-border);
  border-radius: 14px;
  background: linear-gradient(135deg, var(--color-soft), var(--color-secondary-soft));
  transform: rotate(-3deg);
  box-shadow: 0 15px 40px -25px #263c4b55;
}
.auth-note-meta {
  display: flex;
  justify-content: space-between;
  gap: 20px;
  color: var(--color-primary);
  font-size: 11px;
  letter-spacing: 1px;
}
.auth-note h3 {
  font-size: 21px;
  font-weight: 600;
  letter-spacing: -.5px;
  margin: 18px 0 10px;
}
.auth-note > p {
  font-size: 15px;
  line-height: 1.8;
  color: var(--color-muted);
}
.auth-note-tag {
  display: inline-block;
  margin-top: 18px;
  padding: 4px 8px;
  border-radius: 5px;
  background: #ffffffb3;
  color: var(--color-primary);
  font-size: 12px;
}
.auth-intro-detail {
  display: flex;
  align-items: center;
  gap: 8px;
  color: var(--color-primary);
  font-size: 13px;
  margin-top: 28px;
}
.auth-form-panel {
  width: 100%;
  max-width: 450px;
  justify-self: end;
  padding: 36px;
  background: white;
  border: 1px solid var(--color-border);
  border-radius: 18px;
  box-shadow: 0 18px 50px -28px #263c4b30;
}
.auth-form-icon {
  width: 46px;
  height: 46px;
  display: grid;
  place-items: center;
  background: var(--color-soft);
  color: var(--color-primary);
  border: 1px solid var(--color-border);
  border-radius: 13px;
  font-size: 23px;
  margin-bottom: 21px;
}
.auth-form h1 {
  font-size: 30px;
  line-height: 1.2;
  letter-spacing: -1px;
  font-weight: 700;
}
.auth-form-description {
  color: var(--color-muted);
  font-size: 15px;
  line-height: 1.7;
  margin: 10px 0 27px;
}
.auth-submit {
  display: block;
  width: 100%;
  margin-top: 8px;
  font-size: 15px;
}
.auth-form-switch {
  border-top: 1px solid var(--color-border);
  padding-top: 22px;
  margin-top: 26px;
  text-align: center;
  font-size: 14px;
  color: var(--color-muted);
  line-height: 1.8;
}
.auth-form-switch a {
  color: var(--color-primary);
  font-weight: 600;
}
.auth-form-switch a:hover {
  text-decoration: underline;
}
.auth-footer {
  display: flex;
  justify-content: space-between;
  gap: 20px;
  padding-block: 20px;
  border-top: 1px solid var(--color-border);
  color: var(--color-muted);
  font-size: 12px;
}
.auth-footer a:hover {
  color: var(--color-primary);
}
@media (max-width: 1000px) {
  .auth-main {
  gap: 45px;
}

}
@media (max-width: 1000px) {
  .auth-form-panel {
  padding: 28px;
}

}
@media (max-width: 1000px) {
  .auth-header {
  width: calc(100% - 56px);
}

}
@media (max-width: 1000px) {
  .auth-main {
  width: calc(100% - 56px);
}

}
@media (max-width: 1000px) {
  .auth-footer {
  width: calc(100% - 56px);
}

}
@media (max-width: 760px) {
  .auth-main {
  grid-template-columns: 1fr;
  padding-block: 36px;
  gap: 0;
}

}
@media (max-width: 760px) {
  .auth-intro {
  display: none;
}

}
@media (max-width: 760px) {
  .auth-form-panel {
  justify-self: center;
}

}
@media (max-width: 760px) {
  .auth-header {
  min-height: 78px;
}

}
@media (max-width: 760px) {
  .auth-header-action > span {
  display: none;
}

}
@media (max-width: 480px) {
  .auth-header {
  width: calc(100% - 36px);
}

}
@media (max-width: 480px) {
  .auth-main {
  width: calc(100% - 36px);
}

}
@media (max-width: 480px) {
  .auth-footer {
  width: calc(100% - 36px);
}

}
@media (max-width: 480px) {
  .auth-form-panel {
  padding: 26px 22px;
  border-radius: 14px;
}

}
@media (max-width: 480px) {
  .auth-main {
  padding-block: 28px;
}

}
@media (max-width: 480px) {
  .auth-brand {
  font-size: 23px;
}

}
@media (max-width: 480px) {
  .auth-form h1 {
  font-size: 28px;
}

}
@media (max-width: 480px) {
  .auth-footer {
  font-size: 11px;
  gap: 12px;
}

}
.auth-notice {
  margin-block: 14px;
  padding: 10px 12px;
  border: 1px solid var(--color-border);
  border-radius: 8px;
  color: var(--color-primary);
  background: var(--color-soft);
  font-size: 14px;
  line-height: 1.7;
}
`;

const AuthLayout = ({ children, isSignUp = false }) => (
  <div className="auth-page">
      <style>{styles}</style>
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
