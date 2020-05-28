import { firebaseSDK } from '../firebase/firebaseSDK';

export default async (email, password) => {
  return firebaseSDK.auth().signInWithEmailAndPassword(email, password)
  .catch(function(error) {
    console.error(error.message)
  });
}
