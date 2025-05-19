import { createUserWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react';
import { auth, db } from '../utils/firebase.config';
import { addDoc, collection } from 'firebase/firestore';
import { useNavigate } from 'react-router';

const Register = () => {
  const [Email, setEmail] = useState('');
  const [Password, setPassword] = useState('');
  const [Fullname, setFullname] = useState('');
  const [Userid, setUserid] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const AddUserToDataBase = async (Uid) => {
    const docRef = await addDoc(collection(db, 'users'), {
      Name: Fullname,
      Userid: Uid,
    });

    console.log('Document written with ID: ', docRef.id);
  };

  const registerinapp = () => {
    console.log(Fullname, Email, Password);
    setLoading(true);

    createUserWithEmailAndPassword(auth, Email, Password)
      .then((userCredential) => {
        const user = userCredential.user;
        setUserid(user.uid);
        AddUserToDataBase(user.uid);
        console.log(user);
        alert('User Created');
        setEmail('');
        setPassword('');
        navigate('/login');
      })
      .catch((error) => {
        console.log(error.code, error.message);
        alert(error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-lg">
        <h2 className="text-2xl font-semibold text-center mb-6">Register</h2>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Full name</label>
          <input
            value={Fullname}
            onChange={(e) => setFullname(e.target.value)}
            type="text"
            placeholder="Enter your full name"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
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
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            value={Password}
            placeholder="Enter your password"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <button
  onClick={registerinapp}
  disabled={loading}
  className={`w-full py-2 rounded-lg transition duration-300 text-white ${
    loading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
  }`}
>
  {loading ? 'Registering...' : 'Register'}
</button>

<div className="text-center mt-4">
  <p className="text-sm">
    Already have an account?{' '}
    <a
      href="/login"
      className="text-blue-600 hover:underline font-medium"
    >
      Login
    </a>
  </p>
</div>

      </div>
    </div>
  );
};

export default Register;
