import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Create from "./pages/Create";
import AIYouTube from "./pages/AIYouTube";
import AIPDF from "./pages/AIPDF";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import NotFound from "./pages/NotFound";

import { Toaster } from "react-hot-toast";
import { useAuthContext } from "./context/AuthContext";

function App() {
  const { authUser } = useAuthContext()
  const isAuth = Boolean(authUser) // true false

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={isAuth ? <Create /> : <Navigate to={"/login"} />} />
        <Route path="/ai-youtube" element={isAuth ? <AIYouTube /> : <Navigate to={"/login"} />} />
        <Route path="/ai-pdf" element={isAuth ? <AIPDF /> : <Navigate to={"/login"} />} />
        <Route path="/login" element={isAuth ? <Navigate to={"/"} /> : <Login />} />
        <Route path="/signup" element={isAuth ? <Navigate to={"/"} /> : <Signup />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Toaster />
    </>
  )
}

export default App;
