import cookieSession from 'cookie-session';

export const addSession = (req, res) => {
  if (!(process.env.SESSION_SECRET_CURRENT && process.env.SESSION_SECRET_PREVIOUS)) {
    throw new Error('Session secrets must be set as env vars `SESSION_SECRET_CURRENT` and `SESSION_SECRET_PREVIOUS`.');
  }

  const sessionSecrets = [
    process.env.SESSION_SECRET_CURRENT,
    process.env.SESSION_SECRET_PREVIOUS,
  ];

  const includeSession = cookieSession({
    keys: sessionSecrets,
    maxAge: 604800000, // week
    httpOnly: true,
    overwrite: true,
  });

  includeSession(req, res, () => {});
}

export const refreshSession = (req, res) => {
  if (req.session) {
    req.session.nowInMinutes = Math.floor(Date.now() / 60e3);
  }
}

export default handler => (req, res) => {
  try {
    addSession(req, res);
    refreshSession(req, res);
  } catch (e) {
    return res.status(500).json({ error: 'Could not get user session.' })
  }
  return handler(req, res)
}
