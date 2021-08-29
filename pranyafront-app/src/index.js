import React from 'react';
import ReactDOM from 'react-dom';
import {App} from './App'
import {initializeApp} from 'firebase/app';
import {firebaseConfig} from './fireAuth/cred'

const app = initializeApp(firebaseConfig);

ReactDOM.render(<App />,document.getElementById('root'));
