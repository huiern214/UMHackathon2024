import * as React from 'react';
import { useState } from 'react';
import api from '../api/axiosConfig';
import Logo from '../assets/Logo.png';
import { FaUserLock } from 'react-icons/fa';
// import Background from '../../assets/Background.jpg';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { loginFailure, loginSuccess } from '../redux/user/userActions';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });

    // temporary login
    navigate(`/`, { replace: true });
    
    // try {
    //   const response = await api.post('/user/login', {
    //     email: data.get('email'),
    //     password: data.get('password'),
    //   });
      
    //   if (response.status === 200) {
    //     const userPermission = response.data; // Assuming the response contains the user ID
    //     dispatch(loginSuccess(userPermission.userId, userPermission.permission)); // Dispatch the login action with the user ID
    //     toast.success('Successfully logged in');
    //     navigate(`/`, { replace: true }); // Redirect to the home page
    //   }
    // } catch (error) {
    //   console.log(error);
    //   dispatch(loginFailure("Incorrect login credentials"));
    //   toast.error('Incorrect login credentials');
    // }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 m-10">
      {/* <div className="hidden md:block bg-cover bg-center" style={{ backgroundImage: `url(${Background})` }}> */}
      <div className="hidden md:block bg-cover bg-center">
        <div className="flex items-center justify-center h-full">
          <img src={Logo} alt="Logo" className="w-20 h-20" />
          <h1 className="text-6xl text-blue-500">Stockify</h1>
        </div>
      </div>
      <div className="flex items-center justify-center md:h-full">
        <div className="max-w-md w-full space-y-8">
          <div className="flex flex-col items-center">
            <div className="w-20 h-20 flex items-center justify-center rounded-full bg-primary-main">
                <div className="flex items-center justify-center h-12 w-12 bg-primary rounded-full">
                    <FaUserLock className="h-6 w-6 text-white" />
                </div>
            </div>
            <h1 className="text-2xl font-bold mt-4">Login</h1>
          </div>
          <form onSubmit={handleSubmit} className="mt-8 space-y-4">
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email Address"
              required
              className="w-full border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
              className="w-full border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <div className="flex items-center justify-between">
              <div>
                <input type="checkbox" id="remember" className="rounded text-blue-500 focus:ring-blue-500" />
                <label htmlFor="remember" className="ml-2">Remember me</label>
              </div>
              <a href="#" className="text-primary">Forgot password?</a>
            </div>
            <button type="submit" className="w-full py-2 bg-primary text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
              Login
            </button>
          </form>
          <div className="text-center">
            <p className="text-gray-500">Don't have an account? <a href="register" className="text-primary">Register</a></p>
            <p className="text-gray-500">&copy; Stockify {new Date().getFullYear()}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
