import React, { useEffect, useState } from 'react';

import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword,  signOut } from 'firebase/auth';
import { auth } from '../../Firebase/.firebase.init';
import { AuthContext } from './AuthContext';




const AuthProvider = ({children}) => {

 
    const [userData, setUserData] = useState(null);
    const[user,setUser]=useState(null);
    const[loading,setLoading]=useState(true)
    const createUser=(email,password)=>{
        setLoading(true)
        return createUserWithEmailAndPassword(auth,email,password)

    }



    const userLogin=(email,password)=>{
        setLoading(true)
        return signInWithEmailAndPassword(auth,email,password)
    }

    const signOutUser=()=>{
        setLoading(true)
        return signOut(auth);
    }

 useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
    setUser(currentUser);
    setLoading(false);

    if (currentUser?.email) {
      try {
        const res = await fetch(`http://localhost:3000/users/email/${currentUser.email}`);

        if (!res.ok) {
          console.warn("User not found in DB");
          return;
        }

        const data = await res.json();
        setUserData(data);
      } catch (err) {
        console.error('Failed to fetch user data:', err);
      }
    }
  });

  return () => unsubscribe();
}, []);

 const userStatus = userData?.status || null;

    const userInfo={
        user,
        setUser,
         userData,
         userStatus,     
         setUserData,
        loading,
       createUser,
       userLogin,
       signOutUser,
      
      
    }

    return (
         <AuthContext.Provider value={userInfo}>

            {children}
        </AuthContext.Provider>


    );
};

export default AuthProvider;