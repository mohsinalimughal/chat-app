import React from 'react'
import Navbar from '../components/Navbar'
import { useEffect } from 'react'
import { useNavigate } from 'react-router'
import { onAuthStateChanged } from 'firebase/auth'
import { auth, db } from '../utils/firebase.config'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { useParams } from 'react-router'
import { addDoc, Timestamp } from 'firebase/firestore'
import { doc } from 'firebase/firestore'
import { getDoc } from 'firebase/firestore'

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
    where("RecieverId", "in", [Uid, sendToId])
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

useEffect(()=>{

     onAuthStateChanged(auth , (user)=>{
              if(user){
                setUid(user.uid)
                  console.log("User is logged in")
                  GettingData(user.uid,)
              }else{
                navigate("./login")
                  console.log("User is logged out")
              }
     }
    )

},[sendToId])

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
        <div className="min-h-screen bg-gray-100">
            <div className="container mx-auto px-4 py-8">
                <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
                    <div className="p-6 border-b">
                        <h1 className="text-2xl font-bold text-gray-800">Chat with {ReceiverName}</h1>
                    </div>
                    
                    {/* Messages Container */}
                    <div className="h-96 overflow-y-auto p-4 space-y-4">
                        {msgs.length > 0 ? (
                            msgs.map((message, index) => (
                                <div 
                                    key={index} 
                                    className={`flex ${message.CurrentUserid === Uid ? 'justify-end' : 'justify-start'}`}
                                >
                                    <div 
                                        className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${message.CurrentUserid === Uid ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'}`}
                                    >
                                        <p>{message.msg}</p>
                                        <p className={`text-xs mt-1 ${message.CurrentUserid === Uid ? 'text-blue-100' : 'text-gray-500'}`}>
                                            {new Date(message.time?.seconds * 1000).toLocaleTimeString()}
                                        </p>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="flex items-center justify-center h-full">
                                <p className="text-gray-500">No messages yet. Start the conversation!</p>
                            </div>
                        )}
                    </div>
                    
                    {/* Message Input */}
                    <div className="p-4 border-t bg-gray-50">
                        <div className="flex space-x-2">
                            <input 
                                className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={msg}
                                onChange={(e) => setmsg(e.target.value)}
                                type="text" 
                                placeholder="Type your message..."
                                onKeyPress={(e) => e.key === 'Enter' && SendingData()}
                            />
                            <button 
                                onClick={SendingData}
                                className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition duration-200"
                            >
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