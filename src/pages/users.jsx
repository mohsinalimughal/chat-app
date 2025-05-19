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
        const allUsers = await getDocs(query(collection(db, "users")));
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
                navigate("./login")
            }
        })
    }, [])

    return (
        <>
            <Navbar Username={UserName} />
            
            <div className="min-h-screen bg-ivory-50">
                <div className="container mx-auto px-4 py-8">
                    <div className="max-w-4xl mx-auto">
                        {/* Header Section */}
                        <div className="text-center mb-10">
                            <h1 className="text-3xl font-medium text-charcoal-black mb-2">
                                Connect with others
                            </h1>
                            <p className="text-warm-beige">
                                Select a user to start your conversation
                            </p>
                        </div>
                        
                        {/* Users List */}
                        <div className="bg-ivory-white rounded-xl shadow-sm overflow-hidden border border-soft-lavender border-opacity-20">
                            <div className="p-5 border-b border-soft-lavender border-opacity-10">
                                <h2 className="text-lg font-medium text-charcoal-black">
                                    Available Contacts
                                </h2>
                            </div>
                            
                            <div className="divide-y divide-soft-lavender divide-opacity-10">
                                {users.length > 0 ? (
                                    users.map((item) => (
                                        <div 
                                            key={item.id} 
                                            className="p-5 hover:bg-soft-lavender hover:bg-opacity-5 transition-colors duration-300 cursor-pointer"
                                            onClick={() => Handlesingleuser(item.Userid)}
                                        >
                                            <div className="flex items-center space-x-4">
                                                {/* User Avatar */}
                                                <div className="flex-shrink-0">
                                                    <div className="h-12 w-12 rounded-full bg-soft-lavender bg-opacity-20 flex items-center justify-center text-soft-lavender font-medium text-lg">
                                                        {item.Name.charAt(0).toUpperCase()}
                                                    </div>
                                                </div>
                                                
                                                {/* User Info */}
                                                <div className="flex-1 min-w-0">
                                                    <p className="text-base font-medium text-charcoal-black">
                                                        {item.Name}
                                                    </p>
                                                    <p className="text-sm text-warm-beige">
                                                        {item.Email || `ID: ${item.Userid.slice(0, 8)}...`}
                                                    </p>
                                                </div>
                                                
                                                {/* Chevron Icon */}
                                                <div>
                                                    <svg 
                                                        className="h-5 w-5 text-soft-lavender" 
                                                        xmlns="http://www.w3.org/2000/svg" 
                                                        viewBox="0 0 20 20" 
                                                        fill="currentColor"
                                                    >
                                                        <path 
                                                            fillRule="evenodd" 
                                                            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" 
                                                            clipRule="evenodd" 
                                                        />
                                                    </svg>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="p-8 text-center">
                                        <p className="text-warm-beige">No contacts available</p>
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