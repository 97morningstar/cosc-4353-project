import { render, screen } from '@testing-library/react';
import Header from './components/layout/Header';
import Home from './components/Home';

import LogIn from './components/LogIn';


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



