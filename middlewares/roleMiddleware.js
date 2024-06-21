const { hasRole } = require('../utils/roleUtils');

module.exports = (requiredRole) => (req, res, next) => {
    if (!hasRole(req.user.role, requiredRole)) {
        return res.status(403).json({ message: 'Forbidden' });
    }
    next();
};