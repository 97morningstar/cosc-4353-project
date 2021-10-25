import React, { useContext, useState, useEffect } from 'react';
import { auth, signupFirebase, setUserFirebase, logInUserFirebase, db } from '../firebase/firebase'

import { doc, getDoc } from "firebase/firestore";
import { collection, query, where, getDocs } from "firebase/firestore";

export const AuthContext = React.createContext();

export default function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState({});
    const [loading, setLoading] = useState(true);


    const signup = (email, password, firstName, lastName) => {
        // It returns a Promise. Errors are being handled in the
        // SignUp component
        // Set User in database collection users and bring here
        return signupFirebase(auth, email, password)
    }

    const login = (email, password) => {
        return logInUserFirebase(auth, email, password);
    }

    useEffect(() => {
        const unsubscribe = setUserFirebase(auth, user => {

            const q = query(collection(db, "users"), where("uid", "==", user.uid));

            getDocs(q)
                .then(querySnapshot => {
                    querySnapshot.forEach((doc) => {

                        setCurrentUser({
                            email: doc.data().email, 
                            firstName: doc.data().firstName, 
                            lastName: doc.data().firstName,
                            uid: doc.data().uid
                        });

                        // doc.data() is never undefined for query doc snapshots
                        console.log(doc.id, " => ", doc.data());
                    });
                })
                .catch(err => {
                    console.log(err)
                });

            setLoading(false);
            console.log(user)
        })

        return unsubscribe;
    }, []);


    const value = {
        currentUser,
        signup,
        login
    }

    return (
        <>
            <AuthContext.Provider value={value}>
                {!loading && children}
            </AuthContext.Provider>
        </>
    )
}