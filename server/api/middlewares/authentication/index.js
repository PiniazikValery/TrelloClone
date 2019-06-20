exports.requiresAuthentication = (req, res, next) => {
    if (req.isAuthenticated()) {
        next();
    } else {
        res.status(403).json({
            error: 'Authentication needed'
        });
    }
};

exports.addSocketIdtoSession = (req, res, next) => {
    req.session.socketId = req.query.socketId
    next()
}