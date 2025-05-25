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
import { updateDoc, arrayUnion } from 'firebase/firestore';

const Singleuser = ()=>{

    const { id } = useParams();
    const sendToId = id
 
    const [Uid, setUid] = React.useState("")
    const [msg, setmsg] = React.useState("")
    const [UserName, setUserName] = React.useState("")
    const [ReceiverName, setReceiverName] = React.useState("")
    const [users, setUsers] = React.useState([])
    const [msgs, setMsgs] = React.useState([])
    const [InviteSent, setInviteSent] = React.useState(false)
    const [InviteReceived, setInviteReceived] = React.useState(false)
    const [isCheckingStatus, setIsCheckingStatus] = React.useState(false)

    const navigate = useNavigate()

const CheckingInvite = async (Uid) => {
  setIsCheckingStatus(true);
  try {
    const data = await getDocs(query(collection(db, "users"), where("Userid", "==", Uid)));
    const Receiverdata = await getDocs(query(collection(db, "users"), where("Userid", "==", sendToId)));

    if (data.empty || Receiverdata.empty) return;

    const senderFriends = data.docs[0].data().Freinds || [];
    const receiverFriends = Receiverdata.docs[0].data().Freinds || [];

    const sent = senderFriends.includes(sendToId);
    const received = receiverFriends.includes(Uid);

    setInviteSent(sent);
    setInviteReceived(received);

    console.log("Invite sent:", sent);
    console.log("Invite received:", received);
  } finally {
    setIsCheckingStatus(false);
  }
};

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
        CheckingInvite(user.uid)
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
    setmsg("")
}

const HandleSendinvite = async () => {
  setIsCheckingStatus(true);
  try {
    const data = await getDocs(query(collection(db, "users"), where("Userid", "==", Uid)));
    if (!data.empty) {
      const DataDocid = data.docs[0].id;
      await updateDoc(doc(db, "users", DataDocid), {
        Freinds: arrayUnion(sendToId)
      });
      setInviteSent(true);
      await CheckingInvite(Uid); 
    }
  } finally {
    setIsCheckingStatus(false);
  }
};

const HandleAcceptinvite = async () => {
  setIsCheckingStatus(true);
  try {
    const Receiverdata = await getDocs(query(collection(db, "users"), where("Userid", "==", sendToId)));
    if (!Receiverdata.empty) {
      const ReceiverDocid = Receiverdata.docs[0].id;
      await updateDoc(doc(db, "users", ReceiverDocid), {
        Freinds: arrayUnion(Uid)
      });
    }

    const currentUserData = await getDocs(query(collection(db, "users"), where("Userid", "==", Uid)));
    if (!currentUserData.empty) {
      const currentUserDocid = currentUserData.docs[0].id;
      await updateDoc(doc(db, "users", currentUserDocid), {
        Freinds: arrayUnion(sendToId)
      });
    }

    setInviteReceived(true);
    setInviteSent(true);
    await CheckingInvite(Uid);
  } catch (error) {
    console.error("Error accepting invite:", error);
  } finally {
    setIsCheckingStatus(false);
  }
};

    return (
        <>
            <Navbar Username={UserName} />
            <div className="min-h-screen bg-gradient-to-br from-purple-50 to-purple-100">
                <div className="container mx-auto px-4 py-4 sm:py-8">
                    <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden h-[calc(100vh-140px)] sm:h-[calc(100vh-180px)] flex flex-col">
                        {/* Chat Header */}
                        <div className="p-4 sm:p-6 border-b border-purple-100 bg-gradient-to-r from-purple-50 to-white">
                            <h1 className="text-lg sm:text-2xl font-bold text-purple-900 flex items-center">
                                <svg 
                                    xmlns="http://www.w3.org/2000/svg" 
                                    className="h-5 w-5 sm:h-6 sm:w-6 mr-2 text-purple-600" 
                                    fill="none" 
                                    viewBox="0 0 24 24" 
                                    stroke="currentColor"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                </svg>
                                Chat with <span className="text-purple-600 ml-1">{ReceiverName}</span>
                            </h1>
                        </div>
                        
                        {isCheckingStatus ? (
                            <div className="flex-grow flex items-center justify-center bg-purple-50/30">
                                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-purple-600"></div>
                            </div>
                        ) : !InviteSent || !InviteReceived ? (
                            <div className="flex-grow flex items-center justify-center bg-purple-50/30 p-6">
                                <div className="bg-white p-6 rounded-xl shadow-sm border border-purple-100 w-full max-w-md text-center">
                                    <div className="bg-purple-100 p-3 rounded-full inline-flex mb-4">
                                        <svg 
                                            xmlns="http://www.w3.org/2000/svg" 
                                            className="h-8 w-8 text-purple-600" 
                                            fill="none" 
                                            viewBox="0 0 24 24" 
                                            stroke="currentColor"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                                        </svg>
                                    </div>
                                    
                                    <h3 className="text-lg font-semibold text-purple-800 mb-2">
                                        {!InviteSent && !InviteReceived && "Connect to Chat"}
                                        {InviteSent && !InviteReceived && "Invite Sent"}
                                        {InviteReceived && !InviteSent && "Invite Received"}
                                    </h3>
                                    
                                    <p className="text-purple-600 mb-6">
                                        {!InviteSent && !InviteReceived && "Send a friend request to start messaging"}
                                        {InviteSent && !InviteReceived && "Waiting for them to accept your invite"}
                                        {InviteReceived && !InviteSent && "Accept their request to start chatting"}
                                    </p>
                                    
                                    <div className="flex justify-center space-x-4">
                                        {!InviteSent && !InviteReceived && (
                                            <button 
                                                onClick={HandleSendinvite}
                                                className="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white px-5 py-2 rounded-xl shadow-md transition flex items-center"
                                            >
                                                <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                                </svg>
                                                Send Invite
                                            </button>
                                        )}
                                        
                                        {InviteSent && !InviteReceived && (
                                            <button className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-white px-5 py-2 rounded-xl shadow-md flex items-center">
                                                <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                                Invite Sent
                                            </button>
                                        )}
                                        
                                        {InviteReceived && !InviteSent && (
                                            <button 
                                                onClick={HandleAcceptinvite}
                                                className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-5 py-2 rounded-xl shadow-md transition flex items-center"
                                            >
                                                <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                </svg>
                                                Accept Invite
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <>
                                <div className="flex-grow overflow-y-auto p-4 space-y-3 sm:space-y-4 bg-purple-50/30">
                                    {msgs.length > 0 ? (
                                        msgs.map((message, index) => (
                                            <div 
                                                key={index} 
                                                className={`flex ${message.CurrentUserid === Uid ? 'justify-end' : 'justify-start'}`}
                                            >
                                                <div 
                                                    className={`max-w-[80%] sm:max-w-xs lg:max-w-md px-3 py-2 sm:px-4 sm:py-3 rounded-xl shadow-sm ${
                                                        message.CurrentUserid === Uid 
                                                            ? 'bg-gradient-to-r from-purple-500 to-purple-600 text-white' 
                                                            : 'bg-white text-purple-900 border border-purple-100'
                                                    }`}
                                                >
                                                    <p className="text-sm sm:text-base">{message.msg}</p>
                                                    <p className={`text-xs mt-1 ${
                                                        message.CurrentUserid === Uid 
                                                            ? 'text-purple-200' 
                                                            : 'text-purple-500'
                                                    }`}>
                                                        {new Date(message.time?.seconds * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                    </p>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="flex flex-col items-center justify-center h-full text-center p-4">
                                            <svg 
                                                xmlns="http://www.w3.org/2000/svg" 
                                                className="h-12 w-12 sm:h-16 sm:w-16 text-purple-300 mb-2 sm:mb-4" 
                                                fill="none" 
                                                viewBox="0 0 24 24" 
                                                stroke="currentColor"
                                            >
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                            </svg>
                                            <p className="text-purple-700/70 text-sm sm:text-base">No messages yet. Start the conversation!</p>
                                        </div>
                                    )}
                                </div>
                                
                                <div className="p-3 sm:p-4 border-t border-purple-100 bg-white">
                                    <div className="flex space-x-2 sm:space-x-3">
                                        <input 
                                            className="flex-1 border border-purple-200 rounded-xl px-3 py-2 sm:px-4 sm:py-3 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition duration-300"
                                            value={msg}
                                            onChange={(e) => setmsg(e.target.value)}
                                            type="text" 
                                            placeholder="Type your message..."
                                            onKeyPress={(e) => e.key === 'Enter' && SendingData()}
                                        />
                                        <button 
                                            onClick={SendingData}
                                            className="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white px-4 py-2 sm:px-6 sm:py-3 rounded-xl shadow-md transition duration-300 flex items-center text-sm sm:text-base"
                                        >
                                            <svg 
                                                xmlns="http://www.w3.org/2000/svg" 
                                                className="h-4 w-4 sm:h-5 sm:w-5 mr-1" 
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
                            </>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
} 

export default Singleuser