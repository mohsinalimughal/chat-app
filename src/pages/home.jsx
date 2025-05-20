import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth, db } from '../utils/firebase.config';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router';
import Navbar from '../components/Navbar';
import { collection, getDocs, query, where } from 'firebase/firestore';

const Home = () => {
  const [Uid, setUid] = React.useState("");
  const [UserName, setUserName] = React.useState("");
  const navigate = useNavigate();

  const GettingData = async (Uid) => {
    const data = await getDocs(query(collection(db, "users"), where("Userid", "==", Uid)));
    const name = data.docs[0]?.data()?.Name;
    setUserName(name);
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUid(user.uid);
        GettingData(user.uid);
      } else {
        navigate("./login");
      }
    });
  }, []);

  const handleLogout = () => {
    signOut(auth)
      .then(() => alert("Signed out successfully"))
      .catch((error) => alert(error.message));
  };

  return (
    <>
      <Navbar Username={UserName} LogOutFunc={handleLogout} />

      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-purple-100">
        <div className="max-w-4xl mx-auto px-6 py-12">
          <div className="text-center">
            {/* Header with refined typography */}
            <h1 className="text-4xl font-medium text-purple-900 mb-4">
              Welcome back, <span className="text-purple-600">{UserName}</span>
            </h1>
            <p className="text-lg text-purple-700/80 mb-12">
              Your conversations await
            </p>

            {/* Illustration with soft shadow */}
            <div className="max-w-md mx-auto mb-12 rounded-2xl overflow-hidden bg-white p-6 shadow-lg hover:shadow-xl transition-all duration-300">
              <img
                src="https://illustrations.popsy.co/amber/digital-nomad.svg"
                alt="Chat illustration"
                className="w-full h-auto opacity-90 hover:opacity-100 transition-opacity duration-300"
              />
            </div>

            {/* Primary CTA button with gradient */}
            <button
              onClick={() => navigate("/users")}
              className="bg-gradient-to-r from-purple-400 to-purple-500 hover:from-purple-500 hover:to-purple-600 text-white font-medium py-3 px-8 rounded-full shadow-md hover:shadow-lg transition-all duration-300"
            >
              Browse Contacts
            </button>

            {/* Subtle prompt */}
            <p className="mt-8 text-sm text-purple-700/70">
              Tap to reconnect or start new conversations
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;