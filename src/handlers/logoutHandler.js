import { firebaseSDK } from '../firebase/firebaseSDK';

export default async () => {
  return firebaseSDK.auth().signOut()
    .then(() => {
      if (typeof window !== 'undefined') {
        try {
          const elem = window.document.getElementById('__LOGGED_IN_USER');
          if(elem && elem.parentNode) {
            elem.parentNode.removeChild(elem);
          }
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
