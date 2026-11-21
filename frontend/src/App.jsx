import GuestOnly from "./components/GuestOnly";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Main from "./pages/Main";
import Account from "./pages/Account";

function App() {
  return (
    <>
      <div>
        <Router>
          <Routes>
            <Route path="/" element={<GuestOnly><Main /></GuestOnly>} />
            <Route path="/dashboard" element={<Home />} />
            <Route path="/account" element={<Account />} />
            <Route path="/login" element={<GuestOnly><Login /></GuestOnly>} />
            <Route path="/signup" element={<GuestOnly><SignUp /></GuestOnly>} />
          </Routes>
        </Router>
      </div>
    </>
  );
}

export default App;
