import React from 'react'
import Navbar from '../components/Navbar'
import { useEffect } from 'react'
import { useNavigate } from 'react-router'
import { onAuthStateChanged } from 'firebase/auth'
import { auth, db } from '../utils/firebase.config'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { useParams } from 'react-router'
import { addDoc, Timestamp, orderBy } from 'firebase/firestore'
import { doc } from 'firebase/firestore'
import { getDoc } from 'firebase/firestore'
import { onSnapshot } from 'firebase/firestore'

const Singleuser = ()=>{

    const { id } = useParams();
   const sendToId = id
 
    const [Uid, setUid] = React.useState("")
    const [msg, setmsg] = React.useState("")
    const [UserName, setUserName] = React.useState("")
    const [ReceiverName, setReceiverName] = React.useState("")
    const [users, setUsers] = React.useState([])
    const [msgs, setMsgs] = React.useState([])

    const navigate = useNavigate()

const GettingData = async (Uid) => {
  const data = await getDocs(query(collection(db, "users"), where("Userid", "==", Uid)));
  const Receiverdata = await getDocs(query(collection(db, "users"), where("Userid", "==", sendToId)));

  
  const name = data.docs[0].data().Name;
  const Receivername = Receiverdata.docs.length > 0 ? Receiverdata.docs[0].data().Name : "Unknown User";

  setUserName(name);
  setReceiverName(Receivername);

  
  const msgsQuery = query(
    collection(db, "messages"),
    where("CurrentUserid", "in", [Uid, sendToId]),
    where("RecieverId", "in", [Uid, sendToId]),
     orderBy("time", "asc")
  );

 
  const unsubscribe = onSnapshot(msgsQuery, (snapshot) => {
    const updatedMsgs = snapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id
    }));
    setMsgs(updatedMsgs);
    console.log("Live messages updated!");
  });

  console.log("messages came from firebase");
  return unsubscribe;
};

useEffect(() => {
  let unsubscribe;

  const listen = async () => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUid(user.uid);
        console.log("User is logged in");
        unsubscribe = await GettingData(user.uid);
      } else {
        navigate("./login");
        console.log("User is logged out");
      }
    });
  };

  listen();

  return () => {
    if (unsubscribe) unsubscribe();
  };
}, [sendToId]);


const SendingData = async ()=>{
    await addDoc(collection (db, "messages"), {
      msg: msg,
      time: Timestamp.now(),
      CurrentUserid:Uid,
      RecieverId :sendToId
    })
    console.log("data submitted with both ids")
    setmsg("") // Clear input after sending
}

return (
    <>
        <Navbar Username={UserName} />
        <div className="min-h-screen bg-gradient-to-br from-purple-50 to-purple-100">
            <div className="container mx-auto px-4 py-8">
                <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
                    {/* Chat Header */}
                    <div className="p-6 border-b border-purple-100 bg-gradient-to-r from-purple-50 to-white">
                        <h1 className="text-2xl font-bold text-purple-900 flex items-center">
                            <svg 
                                xmlns="http://www.w3.org/2000/svg" 
                                className="h-6 w-6 mr-2 text-purple-600" 
                                fill="none" 
                                viewBox="0 0 24 24" 
                                stroke="currentColor"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                            </svg>
                            Chatting with <span className="text-purple-600 ml-1">{ReceiverName}</span>
                        </h1>
                    </div>
                    
                    {/* Messages Container */}
                    <div className="h-96 overflow-y-auto p-6 space-y-4 bg-purple-50/30">
                        {msgs.length > 0 ? (
                            msgs.map((message, index) => (
                                <div 
                                    key={index} 
                                    className={`flex ${message.CurrentUserid === Uid ? 'justify-end' : 'justify-start'}`}
                                >
                                    <div 
                                        className={`max-w-xs lg:max-w-md px-4 py-3 rounded-xl shadow-sm ${
                                            message.CurrentUserid === Uid 
                                                ? 'bg-gradient-to-r from-purple-500 to-purple-600 text-white' 
                                                : 'bg-white text-purple-900 border border-purple-100'
                                        }`}
                                    >
                                        <p className="text-sm">{message.msg}</p>
                                        <p className={`text-xs mt-1 ${
                                            message.CurrentUserid === Uid 
                                                ? 'text-purple-200' 
                                                : 'text-purple-500'
                                        }`}>
                                            {new Date(message.time?.seconds * 1000).toLocaleTimeString()}
                                        </p>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="flex flex-col items-center justify-center h-full text-center">
                                <svg 
                                    xmlns="http://www.w3.org/2000/svg" 
                                    className="h-16 w-16 text-purple-300 mb-4" 
                                    fill="none" 
                                    viewBox="0 0 24 24" 
                                    stroke="currentColor"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                </svg>
                                <p className="text-purple-700/70">No messages yet. Start the conversation!</p>
                            </div>
                        )}
                    </div>
                    
                    {/* Message Input */}
                    <div className="p-4 border-t border-purple-100 bg-white">
                        <div className="flex space-x-3">
                            <input 
                                className="flex-1 border border-purple-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition duration-300"
                                value={msg}
                                onChange={(e) => setmsg(e.target.value)}
                                type="text" 
                                placeholder="Type your message..."
                                onKeyPress={(e) => e.key === 'Enter' && SendingData()}
                            />
                            <button 
                                onClick={SendingData}
                                className="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white px-6 py-3 rounded-xl shadow-md transition duration-300 flex items-center"
                            >
                                <svg 
                                    xmlns="http://www.w3.org/2000/svg" 
                                    className="h-5 w-5 mr-1" 
                                    fill="none" 
                                    viewBox="0 0 24 24" 
                                    stroke="currentColor"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                                </svg>
                                Send
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
)
} 

export default Singleuser