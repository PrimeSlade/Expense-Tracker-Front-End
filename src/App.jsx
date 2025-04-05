import { Route, Routes, Navigate } from "react-router";
import "./App.css";
import Signup from "./pages/signup/Signup";
import Login from "./pages/login/Login";
import { useAuthContext } from "./hook/useAuthConext";
import Main from "./pages/main/Main";
import Home from "./components/home/Home";
import Expenses from "./components/expenses/Expenses";
import SmartSave from "./components/smart_save/SmartSave";
import Setting from "./components/setting/Setting";

function App() {
  const { user } = useAuthContext();

  return (
    <>
      <Routes>
        <Route path="/" element={user ? <Main /> : <Navigate to="/login" />}>
          {/* Default */}
          <Route index element={<Navigate to="/home" />} />
          {/* Children */}
          <Route path="/home" element={<Home />} />
          <Route path="/expenses" element={<Expenses />} />
          <Route path="/smartsave" element={<SmartSave />} />
          <Route path="/setting" element={<Setting />} />
        </Route>
        <Route
          path="/signup"
          element={!user ? <Signup /> : <Navigate to="/" />}
        />
        <Route
          path="/login"
          element={!user ? <Login /> : <Navigate to="/" />}
        />
      </Routes>
    </>
  );
}

export default App;
