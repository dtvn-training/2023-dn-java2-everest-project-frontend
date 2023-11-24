import "./App.css";
import { Dashboard } from "./pages/Dashboard/Dashboard";
import { Signin } from "./pages/Signin/Signin";
import { Route, Routes } from "react-router-dom";
import { NotFound } from "./pages/NotFound/NotFound";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Signin />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
