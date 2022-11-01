const requireAdminAuth = (req, res, next) => {
  const { role } = req.body;
  if (!role || role !== "admin") {
    return res.status(400).send({ error: "You are not admin" });
  }
  next();
};

module.exports = requireAdminAuth;
