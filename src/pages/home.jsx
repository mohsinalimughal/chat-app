import { onAuthStateChanged, signOut } from 'firebase/auth'
import { auth, db } from '../utils/firebase.config'
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router'
import Navbar from '../components/Navbar'
import { collection, getDocs, query, where } from 'firebase/firestore'

const Home = () => {
  const [Uid, setUid] = React.useState("")
  const [UserName, setUserName] = React.useState("")
  const navigate = useNavigate()

  const GettingData = async (Uid) => {
    const data = await getDocs(query(collection(db, "users"), where("Userid", "==", Uid)));
    const name = data.docs[0]?.data()?.Name;
    setUserName(name)
  }

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if(user) {
        setUid(user.uid)
        GettingData(user.uid)
      } else {
        navigate("./login")
      }
    })
  }, [])

  const handleLogout = () => {
    signOut(auth)
      .then(() => alert("Sign out successful"))
      .catch((error) => alert(error.message))
  }

  return (
    <>
      <Navbar Username={UserName} LogOutFunc={handleLogout} />
      
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-800 mb-6">
              Welcome back, {UserName}!
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Start chatting with your friends today
            </p>
            
            <div className="max-w-2xl mx-auto mb-12">
              <img 
                src="https://illustrations.popsy.co/amber/digital-nomad.svg" 
                alt="Chat illustration"
                className="w-full h-auto"
              />
            </div>
            
            <button
              onClick={() => navigate("/users")}
              className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 px-8 rounded-lg shadow-md transition duration-300"
            >
              Go to Users
            </button>
            
            <p className="mt-6 text-gray-500">
              Select friends to start your conversation
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

export default Home