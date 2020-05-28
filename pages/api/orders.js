import middleware from '../../src/middlewares';
import { firestore } from '../../src/firebase/firebaseSDK';

const handler = (req, res) => {
  if(req.method !== "POST") {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${method} Not Allowed`);
  }

  if (!req.body) {
    return res.status(400).json({ error: "No payload provided." });
  }

  const { title, bookingDate, address, customer } = req.body;
  const payload = { title, bookingDate, address, customer };

  if(!!req.session.user) {
    firestore.collection("orders").add(payload)
      .then(function() { return Promise.resolve(res.status(200).json({ message: "Successfuly created order." })); })
      .catch(function(error) { return Promise.reject(res.status(500).json({ error: error })); });
  } else {
    return res.status(401).json({ message: "You have to be logged in first to do this operation." });
  } 
}

export default middleware(handler);