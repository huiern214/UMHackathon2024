import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from './pages/Login';
import Register from './pages/Register';
import WithNavbar from './components/WithNavbar';
import NotFound404 from './pages/NotFound404';
import Footer from './components/Footer';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <ToastContainer />
        <Routes >
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          {/* <Route element={<WithNavbar />}> */}
            <Route path="*" element={<NotFound404 />} />
          {/* </Route> */}
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
