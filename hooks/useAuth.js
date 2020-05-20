import React from 'react';
import firebaseSDK from '../utils/auth/firebaseSDK';

const useAuth = () => {
  const [state, setState] = React.useState(() => {
    const user = firebaseSDK.auth().currentUser;
    return { initializing: !user, user };
  });

  function loginOnServer(token) {
    return fetch('/api/login', {
      method: 'POST',
      headers: new Headers({ 'Content-Type': 'application/json' }),
      credentials: 'same-origin',
      body: JSON.stringify({ token }),
    });
  }

  function logoutOnServer() {
    return fetch('/api/logout', {
      method: 'POST',
      credentials: 'same-origin',
    });
  };


  function updateSession(user) {
    setState({ initializing: false, user })
    if (user) {
      user.getIdToken().then(loginOnServer);
    } else {
      logoutOnServer();
    }
  }

  React.useEffect(() => {
    const unsubscribe = firebaseSDK.auth().onAuthStateChanged(updateSession);
    return () => unsubscribe();
  }, []);

  return state;
}

export default useAuth;