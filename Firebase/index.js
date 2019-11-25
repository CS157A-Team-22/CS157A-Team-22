import React from 'react';
import ReactDOM from 'react-dom';
import App from '/frontend/App';
import FirebaseContext, {withFirebase} from './context';
import Firebase from './firebase';

ReactDOM.render(
    <FirebaseContext.Provider value={new Firebase()}>
        <App />
    </FirebaseContext.Provider>,
    document.getElementById('root'),
);


export default Firebase;
export {FirebaseContext, withFirebase};