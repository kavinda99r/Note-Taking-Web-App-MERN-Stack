import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Icon from "./Icon";
const AuthLayout = ({
  children,
  isSignUp = false
}) => <div className="min-h-[100svh] flex flex-col bg-base text-ink">
    <header className="w-[min(1160px,_calc(100%_-_80px))] mx-auto min-h-[88px] flex items-center justify-between gap-5 [border-bottom:1px_solid_var(--color-border)] max-[1000px]:w-[calc(100%_-_56px)] max-[760px]:min-h-[78px] max-[480px]:w-[calc(100%_-_36px)]">
      <Link to="/" className="inline-flex items-center text-[25px] font-bold tracking-[-1px] text-ink [&_>_span:last-child]:text-primary max-[480px]:text-[23px]" aria-label="NoteSnap home">
        <span className="grid place-items-center w-[37px] h-[39px] mr-2.5 rounded-[11px_11px_11px_3px] text-white bg-primary text-[21px]"><Icon name="journal-text" /></span>
        Note<span>Snap.</span>
      </Link>
      <div className="flex items-center gap-4 text-[14px] text-muted [&_a]:py-2.5 [&_a]:px-[17px] [&_a]:border [&_a]:border-border [&_a]:rounded-[8px] [&_a]:text-primary [&_a]:font-semibold [&_a]:bg-white [&_a:hover]:bg-soft max-[760px]:[&_>_span]:hidden">
        <span>{isSignUp ? "Already a member?" : "New to NoteSnap?"}</span>
        <Link to={isSignUp ? "/login" : "/signup"}>{isSignUp ? "Log in" : "Get started"}</Link>
      </div>
    </header>
    <main className="w-[min(1160px,_calc(100%_-_80px))] mx-auto flex-1 grid grid-cols-2 items-center gap-[100px] py-12 max-[1000px]:gap-[45px] max-[1000px]:w-[calc(100%_-_56px)] max-[760px]:grid-cols-1 max-[760px]:py-9 max-[760px]:gap-0 max-[480px]:w-[calc(100%_-_36px)] max-[480px]:py-7">
      <aside className="[&_>_h2]:mt-6 [&_>_h2]:mx-0 [&_>_h2]:mb-[18px] [&_>_h2]:text-[clamp(38px,_4.3vw,_58px)] [&_>_h2]:font-bold [&_>_h2]:leading-[1.12] [&_>_h2]:tracking-[-2.4px] [&_>_h2_span]:text-primary [&_>_p]:max-w-[430px] [&_>_p]:text-[17px] [&_>_p]:leading-[1.8] [&_>_p]:text-muted max-[760px]:hidden">
        <span className="inline-flex items-center gap-2 py-2 px-3 border border-border rounded-[6px] bg-soft text-primary text-[13px]"><Icon name="stars" /> A little space for your big ideas</span>
        <h2>A clear page.<br /><span>A clearer mind.</span></h2>
        <p>Keep your ideas, everyday reminders, and next big plans together in one thoughtful space.</p>
        <div className="max-w-[355px] py-[25px] px-7 mt-[30px] mr-0 mb-[23px] ml-3 border border-border rounded-[14px] [background:linear-gradient(135deg,_var(--color-soft),_var(--color-secondary-soft))] -rotate-3 shadow-[0_15px_40px_-25px_#263c4b55] [&_h3]:text-[21px] [&_h3]:font-semibold [&_h3]:tracking-[-.5px] [&_h3]:mt-[18px] [&_h3]:mx-0 [&_h3]:mb-2.5 [&_>_p]:text-[15px] [&_>_p]:leading-[1.8] [&_>_p]:text-muted" aria-label="Example note">
          <div className="flex justify-between gap-5 text-primary text-[11px] tracking-[1px]"><span>A NOTE TO YOURSELF</span><Icon name="pin-angle-fill" /></div>
          <h3>Good things start small.</h3>
          <p>Write down the thought.<br />Make a little room.<br />See where it takes you.</p>
          <span className="inline-block mt-[18px] py-1 px-2 rounded-[5px] bg-[#ffffffb3] text-primary text-[12px]">#a-fresh-start</span>
        </div>
        <div className="flex items-center gap-2 text-primary text-[13px] mt-7"><Icon name="check2-circle" /> Your thoughts. Your own little place.</div>
      </aside>
      <div className="w-full max-w-[450px] justify-self-end p-9 bg-white border border-border rounded-[18px] shadow-[0_18px_50px_-28px_#263c4b30] max-[1000px]:p-7 max-[760px]:justify-self-center max-[480px]:py-[26px] max-[480px]:px-[22px] max-[480px]:rounded-[14px]">{children}</div>
    </main>
    <footer className="w-[min(1160px,_calc(100%_-_80px))] mx-auto flex justify-between gap-5 py-5 border-t border-border text-muted text-[12px] [&_a:hover]:text-primary max-[1000px]:w-[calc(100%_-_56px)] max-[480px]:w-[calc(100%_-_36px)] max-[480px]:text-[11px] max-[480px]:gap-3"><span>A little more organized. A little more you.</span><Link to="/">Back to home</Link></footer>
  </div>;
AuthLayout.propTypes = {
  children: PropTypes.node.isRequired,
  isSignUp: PropTypes.bool
};
export default AuthLayout;
