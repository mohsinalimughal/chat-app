import { onAuthStateChanged, signOut } from 'firebase/auth'
import { auth, db } from '../utils/firebase.config'
import React, { use, useEffect } from 'react'
import { useNavigate } from 'react-router'
import Navbar from '../components/Navbar'
import { setDoc , doc, collection, addDoc, Timestamp, getDoc, query, where, getDocs} from 'firebase/firestore'



const Home = () => {


  const [data, setdata] = React.useState([])
  const [msg, setmsg] = React.useState([])
  const [Uid, setUid] = React.useState("")
  const [UserName, setUserName] = React.useState("")
  const [users, setUsers] = React.useState([])
  

const GettingData = async (Uid)=>{
  
  const data = await getDocs(query(collection(db, "users"), where("Userid", "==", Uid))) ;
  const allUsers = await getDocs(query(collection(db, "users"))) ;
  const allUsersData = allUsers.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
  setUsers(allUsersData)
   const name = data.docs[0].data().Name;
   setUserName(name)
   console.log(name)
   console.log(allUsersData)
}




  // const navigate = Navigate()
  const navigate = useNavigate()


  const SendingData = async ()=>{


        await addDoc(collection (db, "messages"), {

          
          msg: msg,
          time: Timestamp.now(),
           userId: Uid
          })
          
      
        console.log("data submitted")
      }








useEffect(()=>{

     onAuthStateChanged(auth , (user)=>{
              if(user){
                setUid(user.uid)
                  console.log("User is logged in")
                  GettingData(user.uid)
              }else{
                navigate("./login")
                  console.log("User is logged out")
              }
     }
    )

   

},[])



    const handleLogout = () => {
    
      
signOut(auth)
.then(() => {
  alert("sign out successful")
  // Sign-out successful.
})
.catch((error) => {
  // An error happened.
  alert(error.message)
});

    
    }




  return (
    <>
    <Navbar Username={UserName}  LogOutFunc={handleLogout} />
    
    <div>
      <h1>hello home </h1>
      <input className='border-2'  onChange={(e)=>setmsg(e.target.value)}  type="text" />
      <button onClick={SendingData}>submit</button>
    </div>
    <div>
      <h1>All users</h1>
      {users.map((item)=>{
        return(
          <div className='flex flex-col justify-center items-center'>
             <h1 className='m-2 border-1 w-100 p-1'>{item.Name}</h1>
          </div>
           
        )
      })}
    </div>
    </>
  )
}

export default Home
