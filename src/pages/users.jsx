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
        const data = await getDocs(query(collection(db, "users"), where("Userid", "==", Uid))) ;
        const allUsers = await getDocs(query(collection(db, "users"))) ;
        const allUsersData = allUsers.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
        setUsers(allUsersData)
        const name = data.docs[0].data().Name;
        setUserName(name)
        console.log(name)
        console.log(allUsersData)
    }

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if(user) {
                setUid(user.uid)
                console.log("User is logged in")
                GettingData(user.uid)
            } else {
                navigate("./login")
                console.log("User is logged out")
            }
        })
    }, [])

    return (
        <>
            <Navbar Username={UserName} />
            
            <div className="min-h-screen bg-gray-100">
                <div className="container mx-auto px-4 py-8">
                    <div className="max-w-4xl mx-auto">
                        {/* Header Section */}
                        <div className="text-center mb-8">
                            <h1 className="text-3xl font-bold text-gray-800 mb-2">User Directory</h1>
                            <p className="text-gray-600">Select a user to start chatting</p>
                        </div>
                        
                        {/* Users List */}
                        <div className="bg-white rounded-lg shadow-md overflow-hidden">
                            <div className="p-4 border-b">
                                <h2 className="text-xl font-semibold text-gray-700">Available Users</h2>
                            </div>
                            
                            <div className="divide-y divide-gray-200">
                                {users.length > 0 ? (
                                    users.map((item) => (
                                        <div 
                                            key={item.id} 
                                            className="p-4 hover:bg-gray-50 transition-colors cursor-pointer"
                                            onClick={() => Handlesingleuser(item.Userid)}
                                        >
                                            <div className="flex items-center space-x-4">
                                                <div className="flex-shrink-0">
                                                    <div className="h-10 w-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-medium">
                                                        {item.Name.charAt(0).toUpperCase()}
                                                    </div>
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <p className="text-sm font-medium text-gray-900 truncate">
                                                        {item.Name}
                                                    </p>
                                                    <p className="text-sm text-gray-500 truncate">
                                                        User ID: {item.Userid}
                                                    </p>
                                                </div>
                                                <div>
                                                    <svg 
                                                        className="h-5 w-5 text-gray-400" 
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
                                        <p className="text-gray-500">No users found</p>
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