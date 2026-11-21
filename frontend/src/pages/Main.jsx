import Icon from "../components/Icon";
import { Link } from "react-router-dom";

const styles = `
.landing {
  color: var(--color-ink);
  background: var(--color-base);
  min-height: 100svh;
  display: flex;
  flex-direction: column;
  font-family: "Roboto", sans-serif;
}
.landing * {
  box-sizing: border-box;
}
.landing *::before {
  box-sizing: border-box;
}
.landing *::after {
  box-sizing: border-box;
}
.landing main {
  flex: 1;
  display: flex;
  flex-direction: column;
}
.landing-container {
  width: min(1240px, calc(100% - 96px));
  margin-inline: auto;
}
.landing a {
  text-decoration: none;
}
.landing a:focus-visible {
  outline: 3px solid var(--color-primary);
  outline-offset: 6px;
}
.landing-skip {
  position: fixed;
  top: -80px;
  left: 16px;
  padding: 12px 20px;
  background: white;
  z-index: 10;
}
.landing-skip:focus {
  top: 12px;
}
.landing-nav {
  min-height: 80px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 24px;
  border-bottom: 1px solid var(--color-border);
}
.landing-brand {
  display: inline-flex;
  align-items: center;
  font-size: 25px;
  font-weight: 700;
  letter-spacing: -1px;
  color: var(--color-ink);
}
.landing-brand > span:last-child {
  color: var(--color-primary);
}
.landing-brand-icon {
  width: 37px;
  height: 39px;
  margin-right: 10px;
  display: grid;
  place-items: center;
  background: var(--color-primary);
  color: white;
  border-radius: 11px 11px 11px 3px;
  font-size: 21px;
}
.landing-nav nav {
  display: flex;
  align-items: center;
  gap: 30px;
  font-size: 14px;
  font-weight: 500;
}
.landing-nav nav > a:not(.landing-button) {
  color: var(--color-ink);
}
.landing-nav nav > a:not(.landing-button):hover {
  color: var(--color-primary);
}
.landing-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 17px 26px;
  border-radius: 9px;
  font-size: 15px;
  font-weight: 600;
}
.landing-button:hover {
  transform: translateY(-2px);
}
.landing-button-small {
  padding: 12px 19px;
  font-size: 14px;
}
.landing-hero {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 48px;
  align-items: center;
  padding-block: 40px;
  flex: 1;
}
.landing-eyebrow {
  display: inline-flex;
  gap: 9px;
  align-items: center;
  font-size: 13px;
  color: var(--color-primary);
  background: var(--color-soft);
  border: 1px solid var(--color-border);
  padding: 8px 12px;
  border-radius: 6px;
}
.landing-eyebrow .bi {
  color: var(--color-primary);
}
.landing-hero h1 {
  font-size: clamp(48px, 4.8vw, 68px);
  line-height: 1.08;
  letter-spacing: -2.8px;
  font-weight: 700;
  margin: 20px 0 18px;
}
.landing-hero h1 > span {
  color: var(--color-primary);
}
.landing-hero-copy > p {
  max-width: 490px;
  font-size: 18px;
  line-height: 1.65;
  color: var(--color-muted);
}
.landing-hero-actions {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 23px;
  margin-top: 22px;
}
.landing-text-link {
  display: flex;
  gap: 8px;
  align-items: center;
  font-size: 14px;
  font-weight: 500;
  color: var(--color-ink);
}
.landing-text-link:hover {
  color: var(--color-primary);
}
.landing-hero-detail {
  display: flex;
  flex-wrap: wrap;
  gap: 23px;
  margin-top: 16px;
  color: var(--color-muted);
  font-size: 13px;
}
.landing-hero-detail > span {
  display: flex;
  align-items: center;
  gap: 6px;
}
.landing-hero-detail .bi {
  color: var(--color-primary);
}
.landing-footer {
  padding-block: 18px;
  margin-top: 0;
  border-top: 1px solid var(--color-border);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  font-size: 12px;
  color: var(--color-muted);
}
.landing-footer-brand {
  font-size: 18px;
  font-weight: 700;
  color: var(--color-ink);
  letter-spacing: -.6px;
}
@media (max-width: 1050px) {
  .landing-container {
  width: calc(100% - 56px);
}

}
@media (max-width: 1050px) {
  .landing-hero {
  gap: 28px;
}

}
@media (max-width: 1050px) {
  .landing-hero h1 {
  font-size: 45px;
  letter-spacing: -2px;
}

}
@media (max-width: 800px) {
  .landing-hero {
  grid-template-columns: 1fr;
}

}
@media (max-width: 800px) {
  .landing-hero-copy {
  max-width: 580px;
}

}
@media (max-width: 800px) {
  .landing-hero h1 {
  font-size: clamp(42px, 7vw, 58px);
}

}
@media (max-width: 800px) {
  .landing-hero-copy > p {
  max-width: 520px;
}

}
@media (max-width: 800px) {
  .landing-footer > span:last-child {
  display: none;
}

}
@media (max-width: 540px) {
  .landing-container {
  width: calc(100% - 36px);
}

}
@media (max-width: 540px) {
  .landing-nav {
  min-height: 82px;
  gap: 12px;
}

}
@media (max-width: 540px) {
  .landing-brand {
  font-size: 22px;
}

}
@media (max-width: 540px) {
  .landing-brand-icon {
  width: 30px;
  height: 34px;
  margin-right: 7px;
  font-size: 18px;
}

}
@media (max-width: 540px) {
  .landing-nav nav {
  gap: 16px;
}

}
@media (max-width: 540px) {
  .landing-nav .landing-button {
  padding: 10px 12px;
  font-size: 12px;
}

}
@media (max-width: 540px) {
  .landing-nav nav {
  font-size: 13px;
}

}
@media (max-width: 540px) {
  .landing-hero {
  padding-top: 37px;
}

}
@media (max-width: 540px) {
  .landing-hero h1 {
  letter-spacing: -2px;
  font-size: clamp(35px, 9vw, 48px);
}

}
@media (max-width: 540px) {
  .landing-eyebrow {
  font-size: 11px;
  padding: 7px 9px;
}

}
@media (max-width: 540px) {
  .landing-hero-copy > p {
  font-size: 16px;
}

}
@media (max-width: 540px) {
  .landing-hero-actions {
  gap: 20px;
}

}
@media (max-width: 540px) {
  .landing-hero-actions .landing-button {
  width: 100%;
}

}
@media (max-width: 540px) {
  .landing-hero-actions .landing-text-link {
  margin-inline: auto;
}

}
@media (max-width: 540px) {
  .landing-hero-detail {
  justify-content: center;
  gap: 18px;
  font-size: 12px;
}

}
@media (max-width: 540px) {
  .landing-footer {
  align-items: flex-start;
  flex-direction: column;
  gap: 8px;
  padding-block: 24px;
}

}
@media (prefers-reduced-motion: reduce) {
  .landing-button:hover {
  transform: none;
}

}
.landing-video-wrap {
  min-width: 0;
  margin: 0;
  scroll-margin-top: 24px;
}
.landing-video-label {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 14px;
  color: var(--color-muted);
  font-size: 14px;
}
.landing-video-frame {
  aspect-ratio: 16 / 10;
  overflow: hidden;
  border: 1px solid var(--color-border);
  border-radius: 20px;
  background: var(--color-soft);
  box-shadow: 0 24px 60px -28px #263c4b35;
}
.landing-video {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: contain;
  background: var(--color-ink);
}
.landing-video-placeholder {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  height: 100%;
  padding: 28px;
  background: radial-gradient(ellipse at top right, var(--color-highlight) 0, transparent 65%), linear-gradient(140deg, var(--color-soft), var(--color-soft));
}
.landing-video-icon {
  display: grid;
  place-items: center;
  width: 68px;
  height: 68px;
  border: 1px solid var(--color-border);
  border-radius: 20px;
  background: #ffffffb3;
  color: var(--color-primary);
  font-size: 30px;
  margin-bottom: 22px;
}
.landing-video-placeholder h2 {
  font-size: clamp(22px, 2.3vw, 30px);
  font-weight: 600;
  letter-spacing: -.7px;
}
.landing-video-placeholder p {
  margin-top: 10px;
  color: var(--color-muted);
  font-size: 16px;
  line-height: 1.6;
}
.landing-video-status {
  margin-top: 23px;
  padding: 7px 13px;
  border-radius: 999px;
  background: #ffffffbd;
  border: 1px solid var(--color-border);
  color: var(--color-primary);
  font-size: 13px;
}
@media (max-width: 800px) {
  .landing-video-wrap {
  width: min(600px, 100%);
  margin-inline: auto;
}

}
@media (max-width: 540px) {
  .landing-video-frame {
  aspect-ratio: 1.2;
  border-radius: 16px;
}

}
@media (max-width: 540px) {
  .landing-video-placeholder {
  padding: 20px;
}

}
@media (max-width: 540px) {
  .landing-video-icon {
  margin-bottom: 18px;
}

}
@media (max-width: 540px) {
  .landing-video-placeholder p {
  font-size: 14px;
}

}
.landing-why {
  border-top: 1px solid var(--color-border);
  padding-block: 30px 38px;
  margin-top: 0;
  text-align: center;
}
.landing-why-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 32px;
}
.landing-why-grid article {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 17px;
}
.landing-why-icon {
  flex-shrink: 0;
  display: grid;
  place-items: center;
  width: 52px;
  height: 52px;
  border-radius: 14px;
  background: var(--color-soft);
  color: var(--color-primary);
  font-size: 25px;
}
.landing-why-grid article:nth-child(2) .landing-why-icon {
  background: var(--color-secondary-soft);
  color: var(--color-secondary-ink);
  box-shadow: inset 0 0 0 1px var(--color-secondary);
}
.landing-why-grid article:nth-child(3) .landing-why-icon {
  background: var(--color-soft);
  color: var(--color-primary);
  box-shadow: inset 0 0 0 1px var(--color-accent);
}
.landing-why-grid h3 {
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 9px;
  letter-spacing: -.3px;
}
.landing-why-grid p {
  font-size: 16px;
  line-height: 1.7;
  color: var(--color-muted);
  max-width: 290px;
  margin-inline: auto;
}
@media (min-width: 801px) {
  .landing-video-frame {
  aspect-ratio: auto;
  height: clamp(300px, 39svh, 400px);
}

}
@media (min-width: 801px) {
  .landing-video-icon {
  width: 58px;
  height: 58px;
  font-size: 26px;
  margin-bottom: 16px;
}

}
@media (min-width: 801px) {
  .landing-video-status {
  margin-top: 17px;
}

}
@media (max-width: 800px) {
  .landing-hero {
  padding-block: 28px 36px;
  gap: 32px;
}

}
@media (max-width: 800px) {
  .landing-why {
  padding-block: 24px 30px;
}

}
@media (max-width: 800px) {
  .landing-why-grid {
  grid-template-columns: 1fr;
  gap: 32px;
}

}
@media (max-width: 800px) {
  .landing-why-grid article {
  flex-direction: row;
  align-items: center;
  gap: 14px;
  text-align: left;
}

}
@media (max-width: 800px) {
  .landing-why-grid p {
  max-width: none;
  margin-inline: 0;
}

}
@media (max-width: 540px) {
  .landing-footer {
  margin-top: 0;
}

}
@media (min-width: 801px) and (max-height: 800px) {
  .landing-hero {
  padding-block: 26px;
}

}
@media (min-width: 801px) and (max-height: 800px) {
  .landing-hero h1 {
  font-size: clamp(46px, 4.3vw, 58px);
}

}
@media (min-width: 801px) and (max-height: 800px) {
  .landing-video-frame {
  height: 280px;
}

}
@media (min-width: 801px) and (max-height: 800px) {
  .landing-why {
  padding-block: 22px 26px;
}

}
@media (min-width: 801px) and (max-height: 800px) {
  .landing-why-grid h3 {
  font-size: 18px;
}

}
@media (max-width: 800px) {
  .landing-hero {
  flex: none;
}

}
@media (max-width: 800px) {
  .landing-why-grid h3 {
  font-size: 18px;
}

}
@media (max-width: 800px) {
  .landing-why-icon {
  width: 46px;
  height: 46px;
  font-size: 23px;
}

}
`;

// Set this to the video URL or a public asset path when the video is ready.
const demoVideoSrc = "";

const Main = () => (
  <div className="landing">
      <style>{styles}</style>
    <a className="landing-skip" href="#main-content">Skip to content</a>
    <header className="landing-nav landing-container">
      <Link to="/" className="landing-brand" aria-label="NoteSnap home"><span className="landing-brand-icon"><Icon name="journal-text" /></span>Note<span>Snap.</span></Link>
      <nav aria-label="Main navigation"><Link to="/login">Log in</Link><Link to="/signup" className="button-primary landing-button landing-button-small">Get started</Link></nav>
    </header>
    <main id="main-content">
      <section className="landing-hero landing-container" aria-labelledby="hero-heading">
        <div className="landing-hero-copy">
          <span className="landing-eyebrow"><Icon name="stars" /> A little space for your big ideas</span>
          <h1 id="hero-heading">Less in your head.<br /><span>More on a note.</span></h1>
          <p>Your ideas deserve a place to land. Capture the everyday, organize the important, and make room for what’s next.</p>
          <div className="landing-hero-actions"><Link to="/signup" className="landing-button">Start your notebook</Link></div>
          <div className="landing-hero-detail"><span><Icon name="check2" /> Simple by design</span><span><Icon name="check2" /> Yours to organize</span></div>
        </div>
        <figure id="workspace" className="landing-video-wrap">
          <figcaption className="landing-video-label"><Icon name="camera-video" /> A closer look at NoteSnap</figcaption>
          <div className="landing-video-frame">
            {demoVideoSrc ? (
              <video
                className="landing-video"
                src={demoVideoSrc}
                controls
                playsInline
                preload="metadata"
                aria-label="NoteSnap product walkthrough"
              >
                Your browser does not support video playback.
              </video>
            ) : (
              <div className="landing-video-placeholder">
                <span className="landing-video-icon"><Icon name="camera-video" /></span>
                <h2>Your ideas, in motion.</h2>
                <p>A closer look at your everyday notebook.</p>
                <span className="landing-video-status">Video coming soon</span>
              </div>
            )}
          </div>
        </figure>
      </section>
      <section className="landing-why landing-container" aria-label="NoteSnap features">

        <div className="landing-why-grid">
          <article>
            <span className="landing-why-icon"><Icon name="lightning-charge" /></span>
            <div><h3>Capture in a moment</h3><p>Give every idea and reminder a place to land.</p></div>
          </article>
          <article>
            <span className="landing-why-icon"><Icon name="tags" /></span>
            <div><h3>Make it your own</h3><p>Keep projects and everyday thoughts organized with tags.</p></div>
          </article>
          <article>
            <span className="landing-why-icon"><Icon name="pin-angle" /></span>
            <div><h3>Find what matters</h3><p>Pin the essentials and search your notes with ease.</p></div>
          </article>
        </div>
      </section>
    </main>
    <footer className="landing-footer landing-container"><span className="landing-footer-brand">NoteSnap.</span><p>A little more organized. A little more you.</p><span>Made for your everyday.</span></footer>
  </div>
);

export default Main;
