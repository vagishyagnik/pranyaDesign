import {getStorage, ref, uploadBytesResumable } from "firebase/storage";

async function uploadToFirebase(file) {
    const storage = getStorage();
    const location = 'images/' + file.name;
    const storageRef = ref(storage, location);
    var uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on('state_changed',(snapshot)=>{
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        switch (snapshot.state) {
            case 'paused':
                console.log('Upload is paused');
                break;
            case 'running':
                console.log('Upload is running');
                break;
        }
    }, (err)=>{
        console.log('Error Occured')
        switch (err.code) {
            case 'storage/unauthorized':
                console.log('Unauthorized Access');
                break;
            case 'storage/canceled':
                console.log('Upload cancelled by user');
                break;
            case 'storage/unknown':
                console.log('Unknown Storage Error');
                break;
        }
    }, () => {
        console.log('Success');
    })
}

export {uploadToFirebase};