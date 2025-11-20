import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Create from "./pages/Create";
import AIYouTube from "./pages/AIYouTube";
import AIPDF from "./pages/AIPDF";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import NotFound from "./pages/NotFound";


const App = () => (
  <>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/create" element={<Create />} />
      <Route path="/ai-youtube" element={<AIYouTube />} />
      <Route path="/ai-pdf" element={<AIPDF />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </>
);

export default App;
