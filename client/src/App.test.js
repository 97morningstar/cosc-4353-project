import { render, screen } from '@testing-library/react';
import Header from './components/layout/Header';
import Home from './components/Home';

import firebase from 'firebase/compat/app';

import { 
  getAuth, 
  createUserWithEmailAndPassword, 
  onAuthStateChanged, 
  signInWithEmailAndPassword,
  signOut } from "firebase/auth";
import { getFirestore } from "firebase/firestore"

test('renders Header component', () => {
  render(<Header />);
  const linkElement = screen.getByText(/Sign up/i);
  expect(linkElement).toBeInTheDocument();
});

 test('renders Home component', () => {
  render(<Home />);
  const linkElement = screen.getByText(/NextFlood/i);
  expect(linkElement).toBeInTheDocument();
});


const app = firebase.initializeApp({
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID
})

app.auth = () => {
  return { currentUser: { uid: "alice", email: "alice@example.com" } };
}

const auth = () => {
  return { currentUser: { uid: null } };
}
jest.spyOn(app, 'auth').mockImplementation(auth);

const login = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
}

test('Login', () => {
 const info = login('martinezfuenteselisa123321@gmail.com', '123456')
});

