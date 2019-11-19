import React from 'react';
import ReactDOM from 'react-dom';
import './frontend/index.css'; // may not be correct, check
import * as serviceWorker from './serviceWorker'; // not sure about location for next two
import App from './components/App';
import Firebase, { FirebaseContext } from './Firebase';


ReactDOM.render(
    <FirebaseContext.Provider value={new Firebase()}>
        <App />
    </FirebaseContext.Provider>,
    document.getElementById('root'),
);


serviceWorker.unregister();