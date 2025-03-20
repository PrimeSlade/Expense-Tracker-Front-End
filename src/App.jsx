import { Route, Routes, Navigate } from "react-router";
import "./App.css";
import Home from "./pages/home/Home";
import Signup from "./pages/signup/Signup";
import Login from "./pages/login/Login";
import { useAuthContext } from "./hook/useAuthConext";

function App() {
  const { user } = useAuthContext();
  if (user) {
    console.log(user.id);
  }
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
}

export default App;
