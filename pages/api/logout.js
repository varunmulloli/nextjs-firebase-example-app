import middleware from '../../src/middlewares';

const handler = (req, res) => {
  req.session = null;
  res.status(200).json({ status: true });
}

export default middleware(handler);
