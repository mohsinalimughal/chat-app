
import React from 'react'
import Navbar from '../components/Navbar'
import { useEffect } from 'react'
import { useNavigate } from 'react-router'
import { onAuthStateChanged } from 'firebase/auth'  
import { auth, db } from '../utils/firebase.config'
import { collection, getDocs, query, where } from 'firebase/firestore'

const Users = ()=>{
    const [Uid, setUid] = React.useState("")
    const [UserName, setUserName] = React.useState("")
    const [users, setUsers] = React.useState([])
    const navigate = useNavigate()

    const Handlesingleuser = (id)=>{
          navigate(`${id}`)

    }

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




    return(
        <>
              <Navbar Username={UserName} />

        <div>
            <h1>Single User</h1>
            <p>Single user page</p>
        </div>
            <div>
      <h1>All users</h1>
      {users.map((item)=>{
        return(
          <div className='flex flex-col justify-center items-center' key={item.id}>
             <h1 onClick={()=>{Handlesingleuser(item.Userid)}} className='m-2 border-1 w-100 p-1'>{item.Name}</h1>
          </div>
           
        )
      })}
    </div>
        </>
        
    )
} 



export default Users