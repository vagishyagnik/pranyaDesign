// eslint-disable-next-line
import {useState, useEffect} from 'react';
import {googleProvider, facebookProvider} from './fireAuth/authMethods';
import {authenticate} from './fireAuth/authHandler';
import {getAuth, sendEmailVerification} from 'firebase/auth';
import {uploadToFirebase} from './fireStorage/storage'
import {formContent} from './Forms/AddProduct/content'
// import {MultiChoice} from './Forms/Select'
import {useForm} from 'react-hook-form'
import {yupResolver} from '@hookform/resolvers/yup'
import {productSchema} from './Forms/AddProduct/schema'

function App() {

    const {register, handleSubmit, formState: {errors}} = useForm({
        resolver : yupResolver(productSchema)
    });

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [status, setStatus] = useState("Logged Out");
    const [file, setFile] = useState(null);
    const [url, setUrl] = useState("");

    function sendMail(){
            const auth = getAuth();
            sendEmailVerification(auth.currentUser)
            .then(() => {
                console.log("Mail Sent");
            });
    }

    async function login(provider) {
        const result = await authenticate(provider);
        if(result.displayName) {     
            console.log('Success Login ' + result.displayName);
            setStatus("Logged In");
            sendMail();
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

    const onSubmit = (formData) => {
        console.log(url);
        console.log(formData);
    }

    function handleUpload(){
        if(file){
            var location = 'images/' + file.name;
            setUrl(location);
            uploadToFirebase(file);
        }
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
            <br/><br/>

            <form onSubmit={handleSubmit(onSubmit)}>
                {formContent.inputs.map((input, key)=>{
                    return (
                        <div key={key}>
                            <p><label htmlFor={input.name}>{input.label}</label></p>
                            {input.type !== "select" 
                             &&
                             <input type={input.type} placeholder={input.placeholder} name={input.name} {...register(input.name)} />}
                            {input.type === "select"
                             && 
                             <select name={input.name} {...register(input.name)}>
                                {input.options.map((option,key)=>{
                                    return (
                                        <option key={key} value={option}>{option}</option>
                                    )
                                })}
                            </select>
                            }
                            <p>{errors[input.name]?.message}</p>
                        </div>
                    )
                })}
                <input type="file" alt="abc" onChange={fileChange}/>
                <button onClick={()=> handleUpload()}>Upload File</button>
                <br/><br/>
                <label htmlFor="imageUrl">Image URL</label>
                <input name="imageUrl" value={url} type="text" {...register("imageUrl")} readOnly/>
                <br/><br/>
                <button type="submit">Submit</button>
            </form>
        </div>      
    );
}

export {App};