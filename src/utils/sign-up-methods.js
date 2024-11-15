import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "./firebase-config";
import { doc, setDoc } from "firebase/firestore";

// Function to sign up with email and password
export const signUpWithEmailAndPassword = async (email, password, userData) => {  
    try {
      // Create user in Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  
      // Get the user ID
      const userId = userCredential.user.uid;
  
      // Create user data in Firestore
      const userRef = doc(db, 'users', userId);
      await setDoc(userRef, userData);
  
      // Sign in the user automatically after successful sign-up
      await signInWithEmailAndPassword(auth, email, password);
  
      return userCredential;
    } catch (error) {
      throw error;
    }
};