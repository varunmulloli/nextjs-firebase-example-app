import middleware from '../../src/middlewares';

const handler = (req, res) => {
  if(req.method !== "POST") {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${method} Not Allowed`);
  }
  
  req.session = null;
  res.status(200).json({ status: true });
}

export default middleware(handler);
