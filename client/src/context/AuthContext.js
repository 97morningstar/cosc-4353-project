import React, { useContext, useState, useEffect } from 'react';
import { 
    auth, 
    signupFirebase, 
    setUserFirebase, 
    logInUserFirebase, 
    db,
    LogOut } from '../firebase/firebase'

import { doc, getDoc } from "firebase/firestore";
import { collection, query, where, getDocs } from "firebase/firestore";
import axios from "axios";

export const AuthContext = React.createContext();

export default function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState(null);
    const [allMarkers, setAllMarkers] = useState([]);

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

    const logout = () => {
        setCurrentUser(null);
        return LogOut(auth);
    }

    useEffect(() => {
        const unsubscribe = setUserFirebase(auth, user => {
            
           if(user) {
            const q = query(collection(db, "users"), where("uid", "==", user.uid));

            getDocs(q)
                .then(querySnapshot => {
                    querySnapshot.forEach((doc) => {

                        setCurrentUser({
                            email: doc.data().email, 
                            firstName: doc.data().firstName, 
                            lastName: doc.data().firstName,
                            uid: doc.data().uid,
                            userid: doc.id
                        });

                        // doc.data() is never undefined for query doc snapshots
                       /* console.log(doc.id, " => ", doc.data());
                        console.log(doc._key.path.segments[6]);
                        console.log(doc);*/
                    });
                })
                .catch(err => {
                    console.log(err)
                });

                 }


                // Getting all markers
              /*  const q1 = collection(db, "users");

                getDocs(q1)
                .then(querySnapshot => {
                    querySnapshot.forEach((doc) => {
                        setAllMarkers(allMarkers => allMarkers.concat(doc.data().markers));
                    });
                })
                .catch(err => {
                    console.log(err)
                });*/

                axios.get("http://localhost:4000/api/view_all_markers/")
                .then((res) => {
  
                 let severityArray = ['none', 'low', 'moderate', 'major', 'critical'];  
                  
                  setAllMarkers(res.data.map(data => {

                    let date = data.created_on.substring(0, 10).split('-')
                 
                    let finalDateFormatted = date[2]+'/'+date[1]+'/'+date[0];

                      return {
                          longitude: parseFloat(data.longitude),
                          latitude: parseFloat(data.latitude),
                          severity: severityArray[data.severity],
                          description: data.description,
                          user_id: data.user_id,
                         created_on: finalDateFormatted,
                         image: data.image
                      }
                  }));

                
                  
  
                  //console.log("Employee Firstname:", res.data[0].first_name);
  
                })
                .catch((err) => {
                  console.log(err);
                });


           

            setLoading(false);
         
        })
    

        return unsubscribe;
    
    }, []);


    const value = {
        currentUser,
        allMarkers,
        setAllMarkers,
        signup,
        login,
        logout
    }

    return (
        <>
            <AuthContext.Provider value={value}>
                {!loading && children}
            </AuthContext.Provider>
        </>
    )
}