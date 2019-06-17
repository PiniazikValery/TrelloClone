exports.handleMaxFileSizeError = (err, req, res, next) => {
    if (err.code === 'LIMIT_FILE_SIZE') {
        res.status(422).json({
            error: 'Max file size',
        });
    } else {
        next();
    }
};

exports.handleFileUploadError = (req, res, next) => {
    if (req.fileUploadError === undefined) {
        if (req.file === undefined) {
            res.status(422).json({
                error: 'No image to upload found',
            });
        } else {
            next();
        }
    } else {
        switch (req.fileUploadError.errorType) {
            case 'fileValidationError':
                res.status(422).json({
                    error: 'Wrong file type',
                });
                break;
            default:
                res.status(500).json({
                    error: req.fileUploadError.error.message,
                    message: 'Some error occure while uploading image',
                });
        }
    }
};