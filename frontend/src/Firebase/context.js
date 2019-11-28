import React from 'react';

// For grabbing the context when needed
const FirebaseContext = React.createContext(null);


export const withFirebase = Component => props => (
    <FirebaseContext.Consumer>
        {firebase => <Component {...props} firebase={firebase} />}
    </FirebaseContext.Consumer>
);

export default FirebaseContext;

export {FirebaseContext};