import Icon from "../components/Icon";
import { Link } from "react-router-dom";

// Set this to the video URL or a public asset path when the video is ready.
const demoVideoSrc = "";
const Main = () => <div className="text-ink bg-base min-h-[100svh] flex flex-col font-sans [&_*]:box-border [&_*::before]:box-border [&_*::after]:box-border [&_main]:flex-1 [&_main]:flex [&_main]:flex-col [&_a]:no-underline [&_a:focus-visible]:[outline:3px_solid_var(--color-primary)] [&_a:focus-visible]:[outline-offset:6px]">
    <a className="fixed top-[-80px] left-4 py-3 px-5 bg-white z-[10] focus:top-3" href="#main-content">Skip to content</a>
    <header className="min-h-20 flex justify-between items-center gap-6 [border-bottom:1px_solid_var(--color-border)] [&_nav]:flex [&_nav]:items-center [&_nav]:gap-[30px] [&_nav]:text-[14px] [&_nav]:font-medium [&_nav_>_a:not(.landing-button)]:text-ink [&_nav_>_a:not(.landing-button):hover]:text-primary max-[540px]:min-h-[82px] max-[540px]:gap-3 max-[540px]:[&_nav]:gap-4 max-[540px]:[&_.landing-button]:py-2.5 max-[540px]:[&_.landing-button]:px-3 max-[540px]:[&_.landing-button]:text-[12px] max-[540px]:[&_nav]:text-[13px] w-[min(1240px,_calc(100%_-_96px))] mx-auto max-[1050px]:w-[calc(100%_-_56px)] max-[540px]:w-[calc(100%_-_36px)]">
      <Link to="/" className="inline-flex items-center text-[25px] font-bold tracking-[-1px] text-ink [&_>_span:last-child]:text-primary max-[540px]:text-[22px]" aria-label="NoteSnap home"><span className="w-[37px] h-[39px] mr-2.5 grid place-items-center bg-primary text-white rounded-[11px_11px_11px_3px] text-[21px] max-[540px]:w-[30px] max-[540px]:h-[34px] max-[540px]:mr-[7px] max-[540px]:text-[18px]"><Icon name="journal-text" /></span>Note<span>Snap.</span></Link>
      <nav aria-label="Main navigation"><Link to="/login">Log in</Link><Link to="/signup" className="button-primary landing-button inline-flex items-center justify-center rounded-[9px] font-semibold hover:[transform:translateY(-2px)] motion-reduce:hover:transform-none py-3 px-[19px] text-[14px]">Get started</Link></nav>
    </header>
    <main id="main-content">
      <section className="grid grid-cols-2 gap-12 items-center py-10 flex-1 [&_h1]:text-[clamp(48px,_4.8vw,_68px)] [&_h1]:leading-[1.08] [&_h1]:tracking-[-2.8px] [&_h1]:font-bold [&_h1]:mt-5 [&_h1]:mx-0 [&_h1]:mb-[18px] [&_h1_>_span]:text-primary max-[1050px]:gap-7 max-[1050px]:[&_h1]:text-[45px] max-[1050px]:[&_h1]:tracking-[-2px] max-[800px]:grid-cols-1 max-[800px]:[&_h1]:text-[clamp(42px,_7vw,_58px)] max-[540px]:[&_h1]:tracking-[-2px] max-[540px]:[&_h1]:text-[clamp(35px,_9vw,_48px)] max-[800px]:pt-[28px] max-[800px]:pb-[36px] max-[800px]:gap-8 [@media(min-width:801px)_and_(max-height:800px)]:py-[26px] [@media(min-width:801px)_and_(max-height:800px)]:[&_h1]:text-[clamp(46px,_4.3vw,_58px)] max-[800px]:flex-none w-[min(1240px,_calc(100%_-_96px))] mx-auto max-[1050px]:w-[calc(100%_-_56px)] max-[540px]:w-[calc(100%_-_36px)]" aria-labelledby="hero-heading">
        <div className="[&_>_p]:max-w-[490px] [&_>_p]:text-[18px] [&_>_p]:leading-[1.65] [&_>_p]:text-muted max-[800px]:max-w-[580px] max-[800px]:[&_>_p]:max-w-[520px] max-[540px]:[&_>_p]:text-[16px]">
          <span className="inline-flex gap-[9px] items-center text-[13px] text-primary bg-soft border border-border py-2 px-3 rounded-[6px] [&_.bi]:text-primary max-[540px]:text-[11px] max-[540px]:py-[7px] max-[540px]:px-[9px]"><Icon name="stars" /> A little space for your big ideas</span>
          <h1 id="hero-heading">Less in your head.<br /><span>More on a note.</span></h1>
          <p>Your ideas deserve a place to land. Capture the everyday, organize the important, and make room for what’s next.</p>
          <div className="flex items-center flex-wrap gap-[23px] mt-[22px] max-[540px]:gap-5 max-[540px]:[&_.landing-button]:w-full max-[540px]:[&_.landing-text-link]:mx-auto"><Link to="/signup" className="button-primary landing-button inline-flex items-center justify-center py-[17px] px-[26px] rounded-[9px] text-[15px] font-semibold hover:[transform:translateY(-2px)] motion-reduce:hover:transform-none">Start your notebook</Link></div>
          <div className="flex flex-wrap gap-[23px] mt-4 text-muted text-[13px] [&_>_span]:flex [&_>_span]:items-center [&_>_span]:gap-1.5 [&_.bi]:text-primary max-[540px]:justify-center max-[540px]:gap-[18px] max-[540px]:text-[12px]"><span><Icon name="check2" /> Simple by design</span><span><Icon name="check2" /> Yours to organize</span></div>
        </div>
        <figure id="workspace" className="min-w-0 m-0 [scroll-margin-top:24px] max-[800px]:w-[min(600px,_100%)] max-[800px]:mx-auto">
          <figcaption className="flex items-center gap-2 mb-3.5 text-muted text-[14px]"><Icon name="camera-video" /> A closer look at NoteSnap</figcaption>
          <div className="[aspect-ratio:16_/_10] overflow-hidden border border-border rounded-[20px] bg-soft shadow-[0_24px_60px_-28px_#263c4b35] max-[540px]:[aspect-ratio:1.2] max-[540px]:rounded-[16px] min-[801px]:[aspect-ratio:auto] min-[801px]:h-[clamp(300px,_39svh,_400px)] [@media(min-width:801px)_and_(max-height:800px)]:h-[280px]">
            {demoVideoSrc ? <video className="block w-full h-full object-contain bg-ink" src={demoVideoSrc} controls playsInline preload="metadata" aria-label="NoteSnap product walkthrough">
                Your browser does not support video playback.
              </video> : <div className="flex flex-col items-center justify-center text-center h-full p-7 [background:radial-gradient(ellipse_at_top_right,_var(--color-highlight)_0,_transparent_65%),_linear-gradient(140deg,_var(--color-soft),_var(--color-soft))] [&_h2]:text-[clamp(22px,_2.3vw,_30px)] [&_h2]:font-semibold [&_h2]:tracking-[-.7px] [&_p]:mt-2.5 [&_p]:text-muted [&_p]:text-[16px] [&_p]:leading-[1.6] max-[540px]:p-5 max-[540px]:[&_p]:text-[14px]">
                <span className="grid place-items-center w-[68px] h-[68px] border border-border rounded-[20px] bg-[#ffffffb3] text-primary text-[30px] mb-[22px] max-[540px]:mb-[18px] min-[801px]:w-[58px] min-[801px]:h-[58px] min-[801px]:text-[26px] min-[801px]:mb-4"><Icon name="camera-video" /></span>
                <h2>Your ideas, in motion.</h2>
                <p>A closer look at your everyday notebook.</p>
                <span className="mt-[23px] py-[7px] px-[13px] rounded-[999px] bg-[#ffffffbd] border border-border text-primary text-[13px] min-[801px]:mt-[17px]">Video coming soon</span>
              </div>}
          </div>
        </figure>
      </section>
      <section className="border-t border-border pt-[30px] pb-[38px] mt-0 text-center max-[800px]:pt-[24px] max-[800px]:pb-[30px] [@media(min-width:801px)_and_(max-height:800px)]:pt-[22px] [@media(min-width:801px)_and_(max-height:800px)]:pb-[26px] w-[min(1240px,_calc(100%_-_96px))] mx-auto max-[1050px]:w-[calc(100%_-_56px)] max-[540px]:w-[calc(100%_-_36px)]" aria-label="NoteSnap features">

        <div className="grid grid-cols-3 gap-8 [&_article]:flex [&_article]:flex-col [&_article]:items-center [&_article]:gap-[17px] [&_article:nth-child(2)_.landing-why-icon]:bg-secondary-soft [&_article:nth-child(2)_.landing-why-icon]:text-secondary-ink [&_article:nth-child(2)_.landing-why-icon]:shadow-[inset_0_0_0_1px_var(--color-secondary)] [&_article:nth-child(3)_.landing-why-icon]:bg-soft [&_article:nth-child(3)_.landing-why-icon]:text-primary [&_article:nth-child(3)_.landing-why-icon]:shadow-[inset_0_0_0_1px_var(--color-accent)] [&_h3]:text-[20px] [&_h3]:font-semibold [&_h3]:mb-[9px] [&_h3]:tracking-[-.3px] [&_p]:text-[16px] [&_p]:leading-[1.7] [&_p]:text-muted [&_p]:max-w-[290px] [&_p]:mx-auto max-[800px]:grid-cols-1 max-[800px]:gap-8 max-[800px]:[&_article]:flex-row max-[800px]:[&_article]:items-center max-[800px]:[&_article]:gap-3.5 max-[800px]:[&_article]:text-left max-[800px]:[&_p]:max-w-[none] max-[800px]:[&_p]:mx-0 [@media(min-width:801px)_and_(max-height:800px)]:[&_h3]:text-[18px] max-[800px]:[&_h3]:text-[18px]">
          <article>
            <span className="landing-why-icon shrink-0 grid place-items-center w-[52px] h-[52px] rounded-[14px] bg-soft text-primary text-[25px] max-[800px]:w-[46px] max-[800px]:h-[46px] max-[800px]:text-[23px]"><Icon name="lightning-charge" /></span>
            <div><h3>Capture in a moment</h3><p>Give every idea and reminder a place to land.</p></div>
          </article>
          <article>
            <span className="landing-why-icon shrink-0 grid place-items-center w-[52px] h-[52px] rounded-[14px] bg-soft text-primary text-[25px] max-[800px]:w-[46px] max-[800px]:h-[46px] max-[800px]:text-[23px]"><Icon name="tags" /></span>
            <div><h3>Make it your own</h3><p>Keep projects and everyday thoughts organized with tags.</p></div>
          </article>
          <article>
            <span className="landing-why-icon shrink-0 grid place-items-center w-[52px] h-[52px] rounded-[14px] bg-soft text-primary text-[25px] max-[800px]:w-[46px] max-[800px]:h-[46px] max-[800px]:text-[23px]"><Icon name="pin-angle" /></span>
            <div><h3>Find what matters</h3><p>Pin the essentials and search your notes with ease.</p></div>
          </article>
        </div>
      </section>
    </main>
    <footer className="py-[18px] mt-0 border-t border-border flex items-center justify-between gap-5 text-[12px] text-muted max-[800px]:[&_>_span:last-child]:hidden max-[540px]:items-start max-[540px]:flex-col max-[540px]:gap-2 max-[540px]:py-6 max-[540px]:mt-0 w-[min(1240px,_calc(100%_-_96px))] mx-auto max-[1050px]:w-[calc(100%_-_56px)] max-[540px]:w-[calc(100%_-_36px)]"><span className="text-[18px] font-bold text-ink tracking-[-.6px]">NoteSnap.</span><p>A little more organized. A little more you.</p><span>Made for your everyday.</span></footer>
  </div>;
export default Main;
