import React, { useEffect, useState } from 'react';

import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword,  signOut } from 'firebase/auth';
import { auth } from '../../Firebase/.firebase.init';
import { AuthContext } from './AuthContext';




const AuthProvider = ({children}) => {

 

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

    useEffect(()=>{
        const unsubscribe=onAuthStateChanged(auth,currentUser=>{
             setUser(currentUser)
             setLoading(false)
        })
        return()=> {
            unsubscribe();
        }

    },[])

    const userInfo={
        user,
        setUser,
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