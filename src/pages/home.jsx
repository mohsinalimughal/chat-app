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

      <div className="min-h-screen bg-gradient-to-br from-ivory-50 to-lavender-50">
        <div className="max-w-4xl mx-auto px-6 py-12">
          <div className="text-center">
            {/* Header with refined typography */}
            <h1 className="text-4xl font-medium text-charcoal-black mb-4">
              Welcome back, <span className="text-muted-green">{UserName}</span>
            </h1>
            <p className="text-lg text-warm-beige mb-12">
              Your conversations await
            </p>

            {/* Illustration with soft shadow */}
            <div className="max-w-md mx-auto mb-12 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300">
              <img
                src="https://illustrations.popsy.co/amber/digital-nomad.svg"
                alt="Chat illustration"
                className="w-full h-auto"
              />
            </div>

            {/* Primary CTA button (lavender accent) */}
            <button
              onClick={() => navigate("/users")}
              className="bg-soft-lavender hover:bg-opacity-90 text-ivory-white font-medium py-3 px-8 rounded-xl shadow-sm hover:shadow-md transition-all duration-300"
            >
              Browse Contacts
            </button>

            {/* Subtle prompt */}
            <p className="mt-8 text-sm text-charcoal-black opacity-70">
              Tap to reconnect or start new
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;  