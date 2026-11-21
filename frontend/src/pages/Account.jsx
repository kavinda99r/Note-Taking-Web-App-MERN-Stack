import { useCallback, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import PasswordInput from "../components/PasswordInput";
import axiosInstance from "../utils/axiosInstance";
const Account = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [deleting, setDeleting] = useState(false);
  const [deletePassword, setDeletePassword] = useState("");
  const [confirmed, setConfirmed] = useState(false);
  const [deleteError, setDeleteError] = useState("");
  const [busy, setBusy] = useState("");
  const [logoutError, setLogoutError] = useState("");
  const navigate = useNavigate();
  const logout = async () => {
    if (busy) return;
    setBusy("logout");
    setLogoutError("");
    try {
      await axiosInstance.post("/logout");
      navigate("/login", {
        replace: true
      });
    } catch {
      setLogoutError("Unable to log out. Please try again.");
    } finally {
      setBusy("");
    }
  };
  const loadUser = useCallback(async () => {
    setLoading(true);
    setLoadError("");
    try {
      const {
        data
      } = await axiosInstance.get("/get-user");
      setUser(data.user);
    } catch (error) {
      if (error.response?.status === 401) {
        navigate("/login", {
          replace: true
        });
      } else setLoadError("Your account couldn’t load. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [navigate]);
  useEffect(() => {
    loadUser();
  }, [loadUser]);
  const handleFailure = (error, setError, fallback) => {
    if (error.response?.status === 401) navigate("/login", {
      replace: true
    });else setError(error.response?.data?.message || fallback);
  };
  const changePassword = async event => {
    event.preventDefault();
    if (busy) return;
    setPasswordError("");
    if (newPassword.length < 8) {
      setPasswordError("Use at least 8 characters for your new password.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setPasswordError("The new passwords don’t match.");
      return;
    }
    setBusy("password");
    try {
      await axiosInstance.put("/account/password", {
        currentPassword,
        newPassword
      });
      navigate("/login", {
        replace: true,
        state: {
          notice: "Password changed. Sign in with your new password."
        }
      });
    } catch (error) {
      handleFailure(error, setPasswordError, "Unable to change your password. Please try again.");
    } finally {
      setBusy("");
    }
  };
  const deleteAccount = async event => {
    event.preventDefault();
    if (busy || !confirmed) return;
    setBusy("delete");
    setDeleteError("");
    try {
      await axiosInstance.delete("/account", {
        data: {
          currentPassword: deletePassword
        }
      });
      navigate("/", {
        replace: true
      });
    } catch (error) {
      handleFailure(error, setDeleteError, "Unable to delete your account. Please try again.");
    } finally {
      setBusy("");
    }
  };
  return <div className="min-h-[100svh] min-h-[100svh]">
      <Navbar />
      <main className="w-[min(1240px,_calc(100%_-_96px))] min-h-[calc(100svh_-_80px)] mx-auto pt-[20px] pb-[26px] max-[1050px]:w-[calc(100%_-_56px)] max-[540px]:w-[calc(100%_-_36px)]" aria-label="Account settings">
        <nav className="flex items-center gap-[13px] text-[14px] text-muted mb-5 [&_a]:text-ink [&_a:hover]:text-primary [&_>_span:last-child]:text-ink" aria-label="Account navigation"><Link to="/dashboard">Back to notes</Link><span aria-hidden="true">/</span><span>Account</span></nav>
        {loading ? <p className="text-muted py-10" role="status">Loading your account…</p> : loadError ? <div className="min-w-0 border border-border rounded-[12px] py-[22px] px-[26px] bg-white [&_h2]:text-[19px] [&_h2]:font-semibold [&_h2]:tracking-[-.3px] [&_p]:text-[14px] [&_p]:text-muted [&_p]:leading-[1.7] [&_p]:mt-2 max-[760px]:p-5" role="alert"><p>{loadError}</p><button className="button-primary" onClick={loadUser}>Try again</button></div> : user && <div className="grid grid-cols-1 gap-[18px] [align-items:start] max-[760px]:grid-cols-1 max-[760px]:gap-5">
            <section className="min-w-0 border border-border rounded-[12px] py-[22px] px-[26px] bg-white [&_h2]:text-[19px] [&_h2]:font-semibold [&_h2]:tracking-[-.3px] [&_p]:text-[14px] [&_p]:text-muted [&_p]:leading-[1.7] [&_p]:mt-2 max-[760px]:p-5" aria-labelledby="account-details-heading">
                <div className="flex items-center justify-between gap-5"><h2 id="account-details-heading">Account Details</h2><button className="button-secondary" onClick={logout} disabled={Boolean(busy)}>Log out</button></div>
                {logoutError && <p className="form-error" role="alert">{logoutError}</p>}
                <dl className="grid grid-cols-2 gap-6 mt-[18px] [&_dt]:text-muted [&_dt]:text-[13px] [&_dt]:mb-1.5 [&_dd]:text-[17px] [&_dd]:text-ink [&_dd]:[overflow-wrap:anywhere] max-[760px]:grid-cols-1 max-[760px]:gap-[18px]"><div><dt>Full name</dt><dd>{user.fullName}</dd></div><div><dt>Email address</dt><dd>{user.email}</dd></div></dl>
                
              </section>
            <section className="min-w-0 border border-border rounded-[12px] py-[22px] px-[26px] bg-white [&_h2]:text-[19px] [&_h2]:font-semibold [&_h2]:tracking-[-.3px] [&_p]:text-[14px] [&_p]:text-muted [&_p]:leading-[1.7] [&_p]:mt-2 max-[760px]:p-5" aria-labelledby="password-heading">
              <h2 id="password-heading">Change password</h2><p>Use at least 8 characters. You’ll sign in again afterward.</p>
              <form className="account-form mt-[18px] [&_fieldset]:min-w-0 [&_fieldset:disabled]:opacity-[.65]" onSubmit={changePassword} aria-busy={busy === "password"}>
                <fieldset className="grid grid-cols-3 gap-x-5 [&_>_.form-error]:[grid-column:1_/_-1] [&_>_.button-primary]:[grid-column:1_/_-1] [&_>_.button-primary]:justify-self-start max-[760px]:grid-cols-1" disabled={Boolean(busy)}>
                  <div className="form-field"><label htmlFor="account-current-password">Current password</label><PasswordInput id="account-current-password" value={currentPassword} onChange={event => setCurrentPassword(event.target.value)} autoComplete="current-password" required /></div>
                  <div className="form-field"><label htmlFor="account-new-password">New password</label><PasswordInput id="account-new-password" value={newPassword} onChange={event => setNewPassword(event.target.value)} autoComplete="new-password" required /></div>
                  <div className="form-field"><label htmlFor="account-confirm-password">Confirm new password</label><PasswordInput id="account-confirm-password" value={confirmPassword} onChange={event => setConfirmPassword(event.target.value)} autoComplete="new-password" required /></div>
                  {passwordError && <p className="form-error" role="alert">{passwordError}</p>}
                  <button className="button-primary" type="submit">{busy === "password" ? "Updating…" : "Update password"}</button>
                </fieldset>
              </form>
            </section>
            <section className="min-w-0 border border-border rounded-[12px] py-[22px] px-[26px] bg-white [&_h2]:text-[19px] [&_h2]:font-semibold [&_h2]:tracking-[-.3px] [&_p]:text-[14px] [&_p]:text-muted [&_p]:leading-[1.7] [&_p]:mt-2 max-[760px]:p-5 bg-secondary-soft border-danger-border [&_h2]:text-danger grid grid-cols-[minmax(0,_1fr)_auto] gap-x-6 items-center [&_>_h2]:[grid-column:1] [&_>_p]:[grid-column:1] [&_>_p]:mt-1.5 [&_>_.button-danger]:[grid-column:2] [&_>_.button-danger]:[grid-row:1_/_3] [&_>_.button-danger]:mt-0 [&_>_.account-form]:[grid-column:1_/_-1] [&_>_.account-form]:border-t [&_>_.account-form]:border-danger-border [&_>_.account-form]:pt-5 max-[760px]:grid-cols-1 max-[760px]:[&_>_.button-danger]:[grid-column:1] max-[760px]:[&_>_.button-danger]:[grid-row:auto] max-[760px]:[&_>_.button-danger]:justify-self-start max-[760px]:[&_>_.button-danger]:mt-4" aria-labelledby="delete-heading">
                <h2 id="delete-heading">Delete account</h2><p>Permanently delete your account and all notes. This cannot be undone.</p>
                <button className="button-danger" disabled={Boolean(busy)} aria-expanded={deleting} aria-controls="delete-account-form" onClick={() => {
            setDeleting(!deleting);
            setDeletePassword("");
            setConfirmed(false);
            setDeleteError("");
          }}>{deleting ? "Cancel" : "Delete account"}</button>
                {deleting && <form id="delete-account-form" className="account-form mt-[18px] [&_fieldset]:min-w-0 [&_fieldset:disabled]:opacity-[.65]" onSubmit={deleteAccount} aria-busy={busy === "delete"}><fieldset disabled={Boolean(busy)}><div className="form-field"><label htmlFor="delete-password">Current password</label><PasswordInput id="delete-password" value={deletePassword} onChange={event => setDeletePassword(event.target.value)} autoComplete="current-password" required /></div><label className="flex items-start gap-2.5 text-[14px] leading-[1.7] text-danger mb-5 [&_input]:mt-1.5 [&_input]:[accent-color:var(--color-danger)]"><input type="checkbox" checked={confirmed} onChange={event => setConfirmed(event.target.checked)} required /> I understand my account and notes will be permanently deleted.</label>{deleteError && <p className="form-error" role="alert">{deleteError}</p>}<button className="button-danger solid" type="submit" disabled={!confirmed}>{busy === "delete" ? "Deleting…" : "Permanently delete account"}</button></fieldset></form>}
              </section>
          </div>}
      </main>
    </div>;
};
export default Account;
