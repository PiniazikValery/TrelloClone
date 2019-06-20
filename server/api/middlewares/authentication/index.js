exports.requiresAuthentication = (req, res, next) => {
    if (req.isAuthenticated()) {
        next();
    } else {
        res.status(403).json({
            error: 'Authentication needed'
        });
    }
};

exports.addSocketIdstoSession = (req, res, next) => {
    if (!req.session.socketIds) {
        req.session.socketIds = [];
        req.session.socketIds.push(req.query.socketId);
    } else {
        req.session.socketIds.push(req.query.socketId);
    }
    next()
}