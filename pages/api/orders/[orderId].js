import middleware from '../../../src/middlewares';
import { firestore } from '../../../src/firebase/firebaseSDK';

const handler = (req, res) => {
  if(req.method !== "PUT") {
    res.setHeader('Allow', ['PUT']);
    return res.status(405).end(`Method ${method} Not Allowed`);
  }

  if (!req.body) {
    return res.status(400).json({ error: "No update payload provided." });
  }

  const { query: { orderId }, body } = req;
  const { title, bookingDate } = body;
  const payload = { title, bookingDate };

  if(!!req.session.user) {
    firestore.collection("orders").doc(orderId).update(payload)
      .then(function() { return Promise.resolve(res.status(200).json({ message: "Successfuly updated order." })); })
      .catch(function(error) { return Promise.reject(res.status(500).json({ error: error })); });
  } else {
    return res.status(401).json({ message: "You have to be logged in first to do this operation." });
  }
}

export default middleware(handler);