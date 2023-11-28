import "./App.css";
import Dashboard from "./pages/Dashboard/Dashboard";
import Signin from "./pages/Signin/Signin";
import { Route, Routes } from "react-router-dom";
import NotFound from "./pages/NotFound/NotFound";
import Account from "./pages/Account/Account";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Signin />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/account" element={<Account />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
