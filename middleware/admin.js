function admin(req, res, next) {
  if (!req.user.isAdmin) return res.status(403).send("Not Authorized");
  next();
}

module.exports = admin;
