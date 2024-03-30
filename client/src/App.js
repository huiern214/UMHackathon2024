import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ChatBotPage from "./pages/ChatbotPage";
import WithNavbar from "./components/WithNavbar";
import NotFound404 from "./pages/NotFound404";
import Footer from "./components/Footer";
import Prediction from "./components/Prediction";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <ToastContainer />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/chatbot" element={<ChatBotPage />} />
          <Route path="/predict" element={<Prediction />} />
          {/* <Route element={<WithNavbar />}> */}
          <Route path="*" element={<NotFound404 />} />
          {/* </Route> */}
        </Routes>
        {/* <Footer /> */}
      </BrowserRouter>
    </div>
  );
}

export default App;
