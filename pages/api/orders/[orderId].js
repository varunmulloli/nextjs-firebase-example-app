import middleware from '../../../src/middlewares';

const handler = (req, res) => {
  const { query: { orderId } } = req;
  if (!req.body) {
    return res.status(400).json({ error: "No update payload provided." });
  }

  const { title, bookingDate } = req.body;
  console.log(orderId);

  res.status(200).json({ message: "Update successful" });
}

export default middleware(handler);