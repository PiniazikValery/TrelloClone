const User = require('../../../models/account/user');
const AvatarStorage = require('../../../models/fileStorageFacilities/avatarStorage');

const avatarStorage = new AvatarStorage();

exports.getUser = (req, res) => {
    User.findById(req.user.id)
        .select('-_id -password -updated_at -__v -userid')
        .populate({ path: 'profile', select: '-_id -__v' })
        .then(foundUser => {
            if (foundUser) {
                res.status(200).json({
                    user: foundUser
                });
            } else {
                res.status(404).json({
                    error: 'User not found'
                });
            }
        });
};

exports.getUserAvatar = (req, res) => {
    User.findById(req.user.id)
        .populate('profile')
        .select('-_id -password -updated_at -__v -userid')
        .then(foundUser => {
            if (foundUser.profile.avatar) {
                avatarStorage.getDownloadStreamOfFileById(foundUser.profile.avatar, (downloadStream) => {
                    downloadStream.on('data', (chunk) => {
                        res.write(chunk);
                    });
                    downloadStream.on('error', () => {
                        res.sendStatus(404);
                    });
                    downloadStream.on('end', () => {
                        res.end();
                    });
                });
            } else {
                res.status(404).json({
                    error_message: 'No avatar found for this user'
                });
            }
        });

};

exports.uploadAvatar = (req, res) => {
    User.findById(req.user.id)
        .populate('profile')
        .then(foundUser => {
            if (foundUser.profile.avatar) {
                avatarStorage.deleteFileById(foundUser.profile.avatar, (error) => {
                    if (error) {
                        res.status(500).json({
                            error_message: 'Error occure while avatar uploading'
                        });
                    }
                });
            }
            foundUser.profile.avatar = req.file.id;
            foundUser.profile.save();
            res.status(201).json({
                message: 'Avatar has been successfully uploaded'
            });
        });
};

exports.setUserDescription = (req, res) => {
    const { description } = req.body;

    let errors = [];

    switch (true) {
        case !description:
            errors.push({ msg: 'Please enter description field' });
            break;
        default:
            break;
    }

    if (errors.length > 0) {
        res.status(500).json({
            register_errors: errors,
        });
    } else {
        User.findById(req.user.id)
            .populate('profile')
            .then(foundUser => {
                foundUser.profile.description = description;
                foundUser.profile.save(err => {
                    if (err) {
                        res.status(500).json({
                            message: 'Error occure while updating description'
                        });
                    } else {
                        res.status(201).json({
                            message: 'Description has been successfully updated'
                        });
                    }
                });
            });
    }
};