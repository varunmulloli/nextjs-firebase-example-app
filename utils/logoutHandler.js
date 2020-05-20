import firebaseSDK from './auth/firebaseSDK';

export default async () => {
  return firebaseSDK.auth().signOut()
    .then(() => {
      if (typeof window !== 'undefined') {
        try {
          const elem = window.document.getElementById('__LOGGED_IN_USER');
          elem.parentNode.removeChild(elem);
        } catch (e) {
          console.error(e);
        }
      }
      return true;
    })
    .catch(e => {
      console.error(e);
      return false;
    });
}
