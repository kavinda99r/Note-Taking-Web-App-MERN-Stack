import Icon from "../components/Icon";
import { Link } from "react-router-dom";
import "./Main.css";

// Set this to the video URL or a public asset path when the video is ready.
const demoVideoSrc = "";

const Main = () => (
  <div className="landing">
    <a className="landing-skip" href="#main-content">Skip to content</a>
    <header className="landing-nav landing-container">
      <Link to="/" className="landing-brand" aria-label="NoteSnap home"><span className="landing-brand-icon"><Icon name="journal-text" /></span>Note<span>Snap.</span></Link>
      <nav aria-label="Main navigation"><Link to="/login">Log in</Link><Link to="/signup" className="landing-button landing-button-small">Get started</Link></nav>
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
