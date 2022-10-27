import React, { createContext, useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, sendEmailVerification, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import app from '../../Firebase/Firebase.config';


export const AuthContext = createContext();
const auth = getAuth(app);



const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const providerLogin = (provider) => {
        setLoading(true)
        return signInWithPopup(auth, provider);
    }

    const handleSignOut = () => {
        setLoading(true);
        return signOut(auth);
    }

    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }
    const userLogin = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }

    // const updateUserProfile = (name, photo) => {
    //     setLoading(true);
    //     return updateProfile(auth.currentUser, {
    //         displayName: name,
    //         photoURL: photo
    //     })
    // }


    const updateUserProfile = (profile) => {
        setLoading(true);
        return updateProfile(auth.currentUser, profile)
    }


    const verifyEmail = () => {
        return sendEmailVerification(auth.currentUser);
    }



    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if(currentUser === null || currentUser.emailVerified){
                setUser(currentUser);
                console.log("Inside Auth State Changed User", currentUser);
            }
            
            //setUser(currentUser);
            setLoading(false);
        });

        return () => unsubscribe();

    }, [])


    const AuthInfo = { user, providerLogin, setUser, loading, handleSignOut, createUser, userLogin, updateUserProfile, verifyEmail, setLoading };


    return (
        <AuthContext.Provider value={AuthInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;