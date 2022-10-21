import "./styles/mainlayout/main.scss";
import Register from "./pages/Auth/Register/Register";
import Login from "./pages/Auth/Login/Login";
import { Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./pages/Home/Home";
import Unauthorized from "./pages/Auth/Unauthorized";
import RequireAuth from "./components/Auth/RequireAuth";
import AuthLayout from "./pages/Auth/AuthLayout";
import DailyTasks from "./components/Home/Overview";
import WeeklyTasks from "./components/Home/UpComingTasks";
import MonthlyTasks from "./components/Home/MonthlyTasks";
import AccountSettings from "./components/Home/AccountSettings";
function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* public routes */}
        <Route path="auth" element={<AuthLayout />}>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="unauthorized" element={<Unauthorized />} />
        </Route>
        {/* we want to protect the following routes */}
        {/* RequireAuth having outlet => return child only if context auth has user object */}
        <Route element={<RequireAuth />}>
          <Route path="/home" element={<Home />}>
            <Route path="overview" element={<DailyTasks/>} />
            <Route path="upcoming" element={<WeeklyTasks/>}/>
            {/* <Route path="monthlytasks" element={<MonthlyTasks/>}/> */}
            <Route path="accountsettings" element={<AccountSettings/>}/>
          </Route>
        </Route>
        {/* catch all */}
      </Route>
    </Routes>
  );
}

export default App;
