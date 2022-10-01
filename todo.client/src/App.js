import "./styles/mainlayout/main.scss";
import Register from "./pages/Auth/Register";
import Login from "./pages/Auth/Login";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home.jsx";
import Unauthorized from "./components/Auth/Unauthorized.jsx";
import RequireAuth from "./components/Auth/RequireAuth";
function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* public routes */}
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="unauthorized" element={<Unauthorized />} />
        {/* we want to protect the following routes */}
        <Route element={<RequireAuth />}>
          <Route path="/" element={<Home />} />
        </Route>
        {/* catch all */}
      </Route>
    </Routes>
  );
}

export default App;
