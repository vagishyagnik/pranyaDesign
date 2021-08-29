import {useState, useEffect} from 'react';
import {googleProvider, facebookProvider} from './fireAuth/authMethods';
import {authenticate} from './fireAuth/authHandler';
import {getAuth } from 'firebase/auth';
import {uploadToFirebase} from './fireStorage/storage'

function App() {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("Logged Out");
  const [file, setFile] = useState(null);

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

  function fileChange(event){
        console.log('File Input Done');
        setFile(event.target.files[0]);
  }

  return (
    <div>
        <h1 align="center">Pranya Designs</h1>
        <h2>Name : {name}</h2>
        <h2>Email : {email}</h2>
        <h2>Login Status : {status}</h2>
        <button onClick={()=> login(googleProvider)}>Login with Google</button>
        <button onClick={()=> login(facebookProvider)}>Login with Facebook</button>
        <button onClick={()=> fetchUserDetails()}>FetchDetails</button>
        <br />
        <br />
        <input type="file" alt="abc" onChange={fileChange}/>
        <button onClick={()=> uploadToFirebase(file)}>Upload File</button>
    </div>
  );
}

export {App};


//service firebase.storage {
//   match /b/{bucket}/o {
//     match /{allPaths=**} {
//       allow read, write: if request.auth != null;
//     }
//   }
// }