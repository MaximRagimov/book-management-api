const ADMIN = 1;
const USER = 2;

module.exports = {
    ADMIN,
    USER,

    hasRole(userRole, requiredRole) {
        return (userRole & requiredRole) === requiredRole;
    },
};