import middleware from '../../middlewares/middleware';

const handler = (req, res) => {
  req.session = null;
  res.status(200).json({ status: true });
}

export default middleware(handler);
