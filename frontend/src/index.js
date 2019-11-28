import React from 'react';
import ReactDOM from 'react-dom';

import FirebaseContext, { withFirebase } from './Firebase/context';
import Firebase from './Firebase/firebase';

import './index.css';
import App from './App';


ReactDOM.render(
    <FirebaseContext.Provider value={ new Firebase() }>
        <App />
    </FirebaseContext.Provider>,
    document.getElementById('root'),  
);

export default Firebase;
export { FirebaseContext, withFirebase };
