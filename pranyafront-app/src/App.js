import {useState, useEffect} from 'react';
import {googleProvider, facebookProvider} from './fireAuth/authMethods';
import {authenticate} from './fireAuth/authHandler';
import { getAuth } from 'firebase/auth';

function App() {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("Logged Out");

  async function login(provider) {
      const result = await authenticate(provider);
      try {
          console.log('Success Login ' + result.displayName);
          setStatus("Logged In");
      } catch (err) {
          console.log('Error Occured ' + err); 
      }
  }

  function fetchUserDetails() {
      const user = getAuth().currentUser;
      if (user) {
          setName(user.displayName);
          setEmail(user.email);
      }
      else{
          console.log("Couldn't fetch user details");
      }
  }

  return (
    <div >
        <h1 align="center">Pranya Designs</h1>
        <h2>Name : {name}</h2>
        <h2>Email : {email}</h2>
        <h2>Login Status : {status}</h2>
        <button onClick={()=> login(googleProvider)}>Login with Google</button>
        <button onClick={()=> login(facebookProvider)}>Login with Facebook</button>
        <button onClick={()=> fetchUserDetails()}>FetchDetails</button>
    </div>
  );
}

export {App};
