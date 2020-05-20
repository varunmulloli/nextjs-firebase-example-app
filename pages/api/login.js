import firebaseAdmin from '../../src/firebase/firebaseAdmin';
import middleware from '../../src/middlewares';

const handler = (req, res) => {
  if (!req.body) {
    return res.status(400).json({ error: "No token provided for the login request." });
  }
  const { token } = req.body;

  return firebaseAdmin.auth().verifyIdToken(token)
    .then(user => {
      req.session.user = user;
      return user;
    })
    .then(user => {
      return Promise.resolve(res.status(200).json({ status: true, userInfo: user }));
    })
    .catch(error => {
      return Promise.reject(res.status(500).json({ error }));
    });
}

export default middleware(handler);
