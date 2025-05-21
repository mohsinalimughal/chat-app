import React, { useState, useEffect } from 'react';
import { auth } from '../utils/firebase.config';
import { onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router';

const Login = () => {
  const [Email, setEmail] = useState('');
  const [Password, setPassword] = useState('');
  const [loggedin, setLoggedin] = useState(false);
  const [userid, setUserid] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log('User is logged in');
        setLoggedin(true);
        setUserid(user.uid);
        navigate('/');
      } else {
        console.log('User is logged out');
        setLoggedin(false);
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const loginInApp = () => {
    if (!Email || !Password) {
      alert('Please fill in all fields');
      return;
    }

    setLoading(true);

    signInWithEmailAndPassword(auth, Email, Password)
      .then((userCredential) => {
        console.log('User Logged In');
        const user = userCredential.user;
        setUserid(user.uid);
        setLoggedin(true);
        navigate('/');
      })
      .catch((error) => {
        alert(error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-lg">
        <h2 className="text-2xl font-semibold text-center mb-6">Login</h2>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Email</label>
          <input
            value={Email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Enter your email"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 mb-2">Password</label>
          <input
            value={Password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Enter your password"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <button
          onClick={loginInApp}
          disabled={loading}
          className={`w-full py-2 rounded-lg transition duration-300 text-white ${
            loading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
          }`}
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>

        {/* Don't have an account? */}
        <div className="mt-4 text-center">
          <p className="text-gray-600">
            Don’t have an account?{' '}
            <button
              onClick={() => navigate('/rejister')}
              className="text-blue-600 hover:underline font-medium"
            >
              Register
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;