import Icon from "../components/Icon";
import { Link } from "react-router-dom";


const Main = () => <div className="relative isolate overflow-hidden text-white bg-[#241208] min-h-[100svh] flex flex-col font-sans [&_*]:box-border [&_*::before]:box-border [&_*::after]:box-border [&_main]:flex-1 [&_main]:flex [&_main]:flex-col [&_a]:no-underline [&_a:focus-visible]:[outline:3px_solid_var(--color-primary)] [&_a:focus-visible]:[outline-offset:6px]">
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0">
      <img src="/workspace-background.jpg" alt="" fetchPriority="high" className="h-full w-full object-cover object-top max-[800px]:h-[900px] max-[800px]:object-[65%_top] max-[800px]:[mask-image:linear-gradient(to_bottom,black_0%,black_55%,transparent_100%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(to_top,#241208_0%,rgba(36,18,8,0.98)_20%,rgba(36,18,8,0.72)_42%,rgba(36,18,8,0.25)_75%,rgba(36,18,8,0.2)_100%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(36,18,8,0.68)_0%,rgba(36,18,8,0.28)_48%,transparent_85%)]" />
    </div>
    <a className="fixed z-30 top-[-80px] left-4 py-3 px-5 bg-white text-ink focus:top-3" href="#main-content">Skip to content</a>
    <header className="relative z-20 min-h-[88px] flex justify-between items-center gap-6 border-b border-white/20 [&_nav]:flex [&_nav]:items-center [&_nav]:gap-3 [&_nav]:text-[14px] [&_nav]:font-medium max-[760px]:min-h-[78px] max-[540px]:gap-3 max-[540px]:[&_nav]:gap-2 max-[540px]:[&_.landing-button]:py-2.5 max-[540px]:[&_.landing-button]:px-3 max-[540px]:[&_.landing-button]:text-[12px] max-[540px]:[&_nav]:text-[13px] w-[min(1160px,_calc(100%_-_80px))] mx-auto max-[1000px]:w-[calc(100%_-_56px)] max-[480px]:w-[calc(100%_-_36px)]">
      <Link to="/" className="inline-flex items-center text-[25px] font-bold tracking-[-1px] text-white [&_>_span:last-child]:text-highlight max-[540px]:text-[22px]" aria-label="NoteSnap home"><span className="w-[37px] h-[39px] mr-2.5 grid place-items-center bg-primary text-white rounded-[11px_11px_11px_3px] text-[21px] max-[540px]:w-[30px] max-[540px]:h-[34px] max-[540px]:mr-[7px] max-[540px]:text-[18px]"><Icon name="journal-text" /></span>Note<span>Snap.</span></Link>
      <nav aria-label="Main navigation"><Link to="/login" className="landing-button inline-flex items-center justify-center rounded-[9px] border border-white/20 bg-white/10 px-[19px] py-3 text-[14px] font-semibold text-white/90 transition-colors hover:bg-white/20 hover:border-white/30">Log in</Link><Link to="/signup" className="landing-button inline-flex items-center justify-center rounded-[9px] border border-white/20 bg-white/10 text-white/90 font-semibold transition-colors hover:bg-white/20 hover:border-white/30 py-3 px-[19px] text-[14px]">Get started</Link></nav>
    </header>
    <main id="main-content">
      <section className="grid grid-cols-2 gap-12 items-center py-10 flex-1 [&_h1]:text-[clamp(48px,_4.8vw,_68px)] [&_h1]:leading-[1.08] [&_h1]:tracking-[-2.8px] [&_h1]:font-bold [&_h1]:mt-5 [&_h1]:mx-0 [&_h1]:mb-[18px] [&_h1_>_span]:text-highlight max-[1050px]:gap-7 max-[1050px]:[&_h1]:text-[45px] max-[1050px]:[&_h1]:tracking-[-2px] max-[800px]:grid-cols-1 max-[800px]:[&_h1]:text-[clamp(42px,_7vw,_58px)] max-[540px]:[&_h1]:tracking-[-2px] max-[540px]:[&_h1]:text-[clamp(35px,_9vw,_48px)] max-[800px]:pt-[28px] max-[800px]:pb-[36px] max-[800px]:gap-8 [@media(min-width:801px)_and_(max-height:800px)]:py-[26px] [@media(min-width:801px)_and_(max-height:800px)]:[&_h1]:text-[clamp(46px,_4.3vw,_58px)] max-[800px]:flex-none w-[min(1160px,_calc(100%_-_80px))] mx-auto max-[1000px]:w-[calc(100%_-_56px)] max-[480px]:w-[calc(100%_-_36px)]" aria-labelledby="hero-heading">
        <div className="relative z-20 [&_>_p]:max-w-[490px] [&_>_p]:text-[18px] [&_>_p]:leading-[1.65] [&_>_p]:text-white/80 max-[800px]:max-w-[580px] max-[800px]:[&_>_p]:max-w-[520px] max-[540px]:[&_>_p]:text-[16px]">
          <span className="inline-flex gap-[9px] items-center text-[13px] text-white/90 bg-white/10 border border-white/20 py-2 px-3 rounded-[6px] [&_.bi]:text-highlight max-[540px]:text-[11px] max-[540px]:py-[7px] max-[540px]:px-[9px]"><Icon name="stars" /> A little space for your big ideas</span>
          <h1 id="hero-heading">Less in your head.<br /><span>More on a note.</span></h1>
          <p>Your ideas deserve a place to land. Capture the everyday, organize the important, and make room for what’s next.</p>
          <div className="flex items-center flex-wrap gap-[23px] mt-[22px] max-[540px]:gap-5 max-[540px]:[&_.landing-button]:w-full max-[540px]:[&_.landing-text-link]:mx-auto"><Link to="/signup" className="button-primary landing-button inline-flex items-center justify-center py-[17px] px-[26px] rounded-[9px] text-[15px] font-semibold hover:[transform:translateY(-2px)] motion-reduce:hover:transform-none">Start your notebook</Link></div>
          <div className="flex flex-wrap gap-[23px] mt-4 text-white/70 text-[13px] [&_>_span]:flex [&_>_span]:items-center [&_>_span]:gap-1.5 [&_.bi]:text-primary max-[540px]:justify-center max-[540px]:gap-[18px] max-[540px]:text-[12px]"><span><Icon name="check2" /> Simple by design</span><span><Icon name="check2" /> Yours to organize</span></div>
        </div>
        <figure className="relative z-20 m-0 overflow-hidden rounded-[24px] border border-white/20 shadow-[0_24px_70px_rgba(0,0,0,0.25)] max-[800px]:w-full">
          <img src="/notebook-hero.jpg" alt="An open notebook with handwritten notes on a sunlit desk" width="1585" height="992" fetchPriority="high" className="block aspect-[1.45] w-full object-cover max-[800px]:aspect-[1.6]" />
        </figure>
      </section>
      <section className="relative z-20 border-t border-white/15 pt-[30px] pb-[38px] mt-0 text-center text-white max-[800px]:pt-[24px] max-[800px]:pb-[30px] [@media(min-width:801px)_and_(max-height:800px)]:pt-[22px] [@media(min-width:801px)_and_(max-height:800px)]:pb-[26px] w-[min(1160px,_calc(100%_-_80px))] mx-auto max-[1000px]:w-[calc(100%_-_56px)] max-[480px]:w-[calc(100%_-_36px)]" aria-label="NoteSnap features">

        <div className="grid grid-cols-3 gap-8 [&_article]:flex [&_article]:flex-col [&_article]:items-center [&_article]:gap-[17px] [&_h3]:text-[20px] [&_h3]:font-semibold [&_h3]:mb-[9px] [&_h3]:tracking-[-.3px] [&_p]:text-[16px] [&_p]:leading-[1.7] [&_p]:text-white/70 [&_p]:max-w-[290px] [&_p]:mx-auto max-[800px]:grid-cols-1 max-[800px]:gap-8 max-[800px]:[&_article]:flex-row max-[800px]:[&_article]:items-center max-[800px]:[&_article]:gap-3.5 max-[800px]:[&_article]:text-left max-[800px]:[&_p]:max-w-[none] max-[800px]:[&_p]:mx-0 [@media(min-width:801px)_and_(max-height:800px)]:[&_h3]:text-[18px] max-[800px]:[&_h3]:text-[18px]">
          <article>
            <span className="landing-why-icon shrink-0 grid place-items-center w-[52px] h-[52px] rounded-full border border-highlight text-highlight text-[25px] max-[800px]:w-[46px] max-[800px]:h-[46px] max-[800px]:text-[23px]"><Icon name="lightning-charge" /></span>
            <div><h3>Capture in a moment</h3><p>Give every idea and reminder a place to land.</p></div>
          </article>
          <article>
            <span className="landing-why-icon shrink-0 grid place-items-center w-[52px] h-[52px] rounded-full border border-highlight text-highlight text-[25px] max-[800px]:w-[46px] max-[800px]:h-[46px] max-[800px]:text-[23px]"><Icon name="tags" /></span>
            <div><h3>Make it your own</h3><p>Keep projects and everyday thoughts organized with tags.</p></div>
          </article>
          <article>
            <span className="landing-why-icon shrink-0 grid place-items-center w-[52px] h-[52px] rounded-full border border-highlight text-highlight text-[25px] max-[800px]:w-[46px] max-[800px]:h-[46px] max-[800px]:text-[23px]"><Icon name="pin-angle" /></span>
            <div><h3>Find what matters</h3><p>Pin the essentials and search your notes with ease.</p></div>
          </article>
        </div>
      </section>
    </main>
    <footer className="relative z-20 py-[18px] mt-0 border-t border-white/15 flex items-center justify-between gap-5 text-[12px] text-white/60 max-[800px]:[&_>_span:last-child]:hidden max-[540px]:items-start max-[540px]:flex-col max-[540px]:gap-2 max-[540px]:py-6 max-[540px]:mt-0 w-[min(1160px,_calc(100%_-_80px))] mx-auto max-[1000px]:w-[calc(100%_-_56px)] max-[480px]:w-[calc(100%_-_36px)]"><span className="text-[18px] font-bold text-white tracking-[-.6px]">NoteSnap.</span><p>A little more organized. A little more you.</p><span>Made for your everyday.</span></footer>
  </div>;
export default Main;
