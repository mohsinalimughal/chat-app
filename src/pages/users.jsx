import React from 'react'
import Navbar from '../components/Navbar'
import { useEffect } from 'react'
import { useNavigate } from 'react-router'
import { onAuthStateChanged } from 'firebase/auth'  
import { auth, db } from '../utils/firebase.config'
import { collection, getDocs, query, where } from 'firebase/firestore'

const Users = () => {
    const [Uid, setUid] = React.useState("")
    const [UserName, setUserName] = React.useState("")
    const [users, setUsers] = React.useState([])
    const navigate = useNavigate()

    const Handlesingleuser = (id) => {
        navigate(`${id}`)
    }

    const GettingData = async (Uid) => {
        const data = await getDocs(query(collection(db, "users"), where("Userid", "==", Uid)));
        const allUsers = await getDocs(query(collection(db, "users"), where("Userid", "!=", Uid )));
        const allUsersData = allUsers.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
        setUsers(allUsersData)
        const name = data.docs[0]?.data()?.Name;
        setUserName(name)
    }

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if(user) {
                setUid(user.uid)
                GettingData(user.uid)
            } else {
                navigate("/")
            }
        })
    }, [])

    return (
        <>
            <Navbar Username={UserName} />
            
            <div className="min-h-screen bg-gradient-to-br from-purple-50 to-purple-100 relative overflow-hidden">
                {/* Full-page background illustration */}
                <div className="absolute inset-0 z-0 opacity-10">
                    <div className="absolute top-0 left-0 w-fit h-full">
                        <img 
                            src="https://illustrations.popsy.co/amber/digital-nomad.svg" 
                            alt="Background illustration"
                            className="h-full object-left-top"
                        />
                    </div>
                </div>

                {/* Decorative elements */}
                <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-purple-50/80 to-transparent z-0"></div>
                <div className="absolute top-1/4 right-10 w-40 h-40 rounded-full bg-purple-200/30 blur-3xl z-0"></div>

                <div className="container mx-auto px-4 py-12 relative z-10">
                    <div className="max-w-4xl mx-auto">
                        {/* Header Section */}
                        <div className="text-center mb-12 relative">
                            <div className="absolute -top-20 right-1/4 transform translate-x-1/2 opacity-20 z-0">
                                <svg className="w-40 h-40 text-purple-300" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 12c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm0 2c-1.657 0-3 1.343-3 3s1.343 3 3 3 3-1.343 3-3-1.343-3-3-3zm0 8c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z"/>
                                </svg>
                            </div>
                            <h1 className="text-4xl font-medium text-purple-900 mb-3 relative">
                                Connect with Friends
                            </h1>
                            <p className="text-lg text-purple-700/70 max-w-md mx-auto relative">
                                Start meaningful conversations with people who matter
                            </p>
                        </div>
                        
                        {/* Users List */}
                        <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-xl overflow-hidden border border-white/30 relative z-10">
                            <div className="p-6 border-b border-purple-100/50 bg-gradient-to-r from-purple-50/30 to-white/30">
                                <h2 className="text-xl font-medium text-purple-900/90 tracking-wide flex items-center">
                                    <svg className="w-5 h-5 mr-2 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
                                    </svg>
                                    Your Contacts
                                </h2>
                            </div>
                            
                            <div className="divide-y divide-purple-100/30">
                                {users.length > 0 ? (
                                    users.map((item) => (
                                        <div 
                                            key={item.id} 
                                            className="p-5 hover:bg-purple-50/50 transition-all duration-300 cursor-pointer group relative"
                                            onClick={() => Handlesingleuser(item.Userid)}
                                        >
                                            <div className="absolute inset-0 bg-gradient-to-r from-purple-100/0 to-purple-100/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                            <div className="relative z-10 flex items-center space-x-5">
                                                {/* User Avatar */}
                                                <div className="relative flex-shrink-0">
                                                    <div className="h-14 w-14 rounded-xl bg-gradient-to-br from-purple-200 to-purple-300 flex items-center justify-center text-purple-800 font-medium text-xl shadow-inner group-hover:shadow-lg transition-all">
                                                        {item.Name.charAt(0).toUpperCase()}
                                                    </div>
                                                    <div className="absolute -inset-1 rounded-xl bg-purple-200/30 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                                </div>
                                                
                                                {/* User Info */}
                                                <div className="flex-1 min-w-0">
                                                    <p className="text-lg font-medium text-purple-900 tracking-wide">
                                                        {item.Name}
                                                    </p>
                                                    <p className="text-sm text-purple-600/70">
                                                        {item.Email || `ID: ${item.Userid.slice(0, 8)}...`}
                                                    </p>
                                                </div>
                                                
                                                {/* Chevron Icon */}
                                                <div className="text-purple-400 group-hover:text-purple-600 transition-colors transform group-hover:translate-x-1">
                                                    <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                                        <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"/>
                                                    </svg>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="p-10 text-center relative">
                                        <div className="absolute inset-0 flex items-center justify-center opacity-15 z-0">
                                            <img 
                                                src="https://illustrations.popsy.co/amber/chatting.svg" 
                                                alt="Loading illustration"
                                                className="w-64 h-auto opacity-30"
                                            />
                                        </div>
                                        <div className="relative z-10">
                                            <div className="inline-block p-4 rounded-full bg-purple-100/50 mb-4 shadow-inner">
                                                <div className="h-8 w-8">
                                                    <svg className="animate-spin h-8 w-8 text-purple-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                    </svg>
                                                </div>
                                            </div>
                                            <p className="text-purple-700/70">Loading contacts...</p>
                                            <div className="mt-4 px-6 py-2 bg-gradient-to-r from-purple-400/30 to-purple-500/30 text-transparent rounded-full shadow-md inline-block">
                                                Loading...
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Users