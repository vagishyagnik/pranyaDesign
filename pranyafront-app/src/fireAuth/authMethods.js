import {GoogleAuthProvider, FacebookAuthProvider } from "firebase/auth";

const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();

export {googleProvider, facebookProvider};