export const validateRoles = (...roles) => {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(500).json({
                msg: 'The token must be validated before validating roles'
            })
        }

        if (!roles.includes(req.user.role)) {
            return res.status(401).json({
                msg: 'The user does not have the required role to perform this action'
            });
        }

        next();
    }
}