const multer = require('multer')
const MulterAzureStorage = require('multer-azure-blob-storage').MulterAzureStorage;
const path =require('path');

const connectionString=process.env.connectionString
const accessKey=process.env.accessKey
const accountName=process.env.accountName

const resolveBlobName = (req, file) => {
    return req.mainId+"/"+"refo_"+req.mainId+"_"+Date.now()+path.extname(file.originalname).toLowerCase();
};

const resolveMetadata = (req, file) => {
    return {
        contentType: file.mimetype,
        author: 'kpmg',
        // Add more metadata properties as needed
    };
};

const resolveContentSettings = (req, file) => {
    return {
        contentType: file.mimetype
        // Add more content settings properties as needed
    };
};



const maxSize = 10 * 1024 * 1024; // 10MB

exports.resumeUpload = async function(req, res, next) {
    try {
        const ResumeAzureStorage = new MulterAzureStorage({
            connectionString: connectionString,
            accessKey: accessKey,
            accountName: accountName,
            containerName: 'resumes',
            blobName: resolveBlobName,
            metadata: resolveMetadata,
            contentSettings: resolveContentSettings,
            containerAccessLevel: 'blob'
            
        });
        const upload = multer({
            limits: { fileSize: maxSize },
            storage: ResumeAzureStorage,
            fileFilter: function (req, file, cb) {
                const allowedExtensions = ['.pdf', '.docx', '.doc'];
                const ext = path.extname(file.originalname).toLowerCase();
                if (allowedExtensions.includes(ext)) {
                    cb(null, true);
                } else {
                    cb(new Error('Only PDF, DOCX, and DOC files are allowed'));
                }
            }
        }).single('resume', 1);

        upload(req, res, (err) => {
            if (err) {
                console.error(err);
                res.status(200).json({ status: false, message: 'Unable to upload resume, check the resume size and type' });
            } else {
                next();
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: false, message: 'Internal server error' });
    }
};


exports.imageUpload = async function(req, res, next) {
    try {
        const ImageAzureStorage = new MulterAzureStorage({
            connectionString: connectionString,
            accessKey: accessKey,
            accountName: accountName,
            containerName: 'images',
            blobName: resolveBlobName,
            metadata: resolveMetadata,
            contentSettings: resolveContentSettings,
            containerAccessLevel: 'blob'
            
        });
        const upload = multer({
            limits: { fileSize: maxSize },
            storage: ImageAzureStorage,
            fileFilter: function (req, file, cb) {
                const allowedExtensions = ['.png', '.jpg', '.jpeg'];
                const ext = path.extname(file.originalname).toLowerCase();
                if (allowedExtensions.includes(ext)) {
                    cb(null, true);
                } else {
                    cb(new Error('Only PNG, JPG, and JPEG files are allowed'));
                }
            }
        }).single('image', 1);

        upload(req, res, (err) => {
            if (err) {
                console.error(err);
                res.status(200).json({ status: false, message: 'Unable to upload image, check the resume size and type' });
            } else {
                next();
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: false, message: 'Internal server error' });
    }
};

exports.photoUpload = async function(req, res, next) {
    try {
        const PhotoAzureStorage = new MulterAzureStorage({
            connectionString: connectionString,
            accessKey: accessKey,
            accountName: accountName,
            containerName: 'photos',
            blobName: resolveBlobName,
            metadata: resolveMetadata,
            contentSettings: resolveContentSettings,
            containerAccessLevel: 'blob'
            
        });
        const upload = multer({
            limits: { fileSize: maxSize },
            storage: PhotoAzureStorage,
            fileFilter: function (req, file, cb) {
                const allowedExtensions = ['.png', '.jpg', '.jpeg'];
                const ext = path.extname(file.originalname).toLowerCase();
                if (allowedExtensions.includes(ext)) {
                    cb(null, true);
                } else {
                    cb(new Error('Only PNG, JPG, and JPEG files are allowed'));
                }
            }
        }).single('image', 1);

        upload(req, res, (err) => {
            if (err) {
                console.error(err);
                res.status(200).json({ status: false, message: 'Unable to upload image, check the resume size and type' });
            } else {
                next();
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: false, message: 'Internal server error' });
    }
};

exports.documentUpload = async function(req, res, next) {
    try {
        const DocumentsAzureStorage = new MulterAzureStorage({
            connectionString: connectionString,
            accessKey: accessKey,
            accountName: accountName,
            containerName: 'documents',
            blobName: resolveBlobName,
            metadata: resolveMetadata,
            contentSettings: resolveContentSettings,
            containerAccessLevel: 'blob'
            
        });
        const upload = multer({
            limits: { fileSize: maxSize },
            storage: DocumentsAzureStorage,
            fileFilter: function (req, file, cb) {
                const allowedExtensions = ['.pdf', '.doc', '.docx'];
                const ext = path.extname(file.originalname).toLowerCase();
                if (allowedExtensions.includes(ext)) {
                    cb(null, true);
                } else {
                    cb(new Error('Only PNG, JPG, and JPEG files are allowed'));
                }
            }
        }).single('document', 1);

        upload(req, res, (err) => {
            if (err) {
                console.error(err);
                res.status(200).json({ status: false, message: 'Unable to upload image, check the resume size and type' });
            } else {
                next();
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: false, message: 'Internal server error' });
    }
};


exports.jdUpload = async function(req, res, next) {
    try {
        const RequirementStorage = new MulterAzureStorage({
            connectionString: connectionString,
            accessKey: accessKey,
            accountName: accountName,
            containerName: 'requirements',
            blobName: resolveBlobName,
            metadata: resolveMetadata,
            contentSettings: resolveContentSettings,
            containerAccessLevel: 'blob'
            
        });
        const upload = multer({
            limits: { fileSize: maxSize },
            storage: RequirementStorage,
            fileFilter: function (req, file, cb) {
                const allowedExtensions = ['.pdf', '.doc', '.docx'];
                const ext = path.extname(file.originalname).toLowerCase();
                if (allowedExtensions.includes(ext)) {
                    cb(null, true);
                } else {
                    cb(new Error('Only PNG, JPG, and JPEG files are allowed'));
                }
            }
        }).single('file', 1);

        upload(req, res, (err) => {
            if (err) {
                console.error(err);
                res.status(200).json({ status: false, message: 'Unable to upload image, check the resume size and type' });
            } else {
                next();
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: false, message: 'Internal server error' });
    }
};

exports.screenShotUploader=async(req,res,next)=>{
    try {
        const screenShotsStorage = new MulterAzureStorage({
            connectionString: connectionString,
            accessKey: accessKey,
            accountName: accountName,
            containerName: 'screenShots',
            blobName: resolveBlobName,
            metadata: resolveMetadata,
            contentSettings: resolveContentSettings,
            containerAccessLevel: 'blob'
            
        });
        const upload = multer({
            limits: { fileSize: maxSize },
            storage: screenShotsStorage,
            fileFilter: function (req, file, cb) {
                const allowedExtensions = ['.png', '.jpg', '.jpeg'];
                const ext = path.extname(file.originalname).toLowerCase();
                if (allowedExtensions.includes(ext)) {
                    cb(null, true);
                } else {
                    cb(new Error('Only PNG, JPG, and JPEG files are allowed'));
                }
            }
        }).single('image', 1);

        upload(req, res, (err) => {
            if (err) {
                console.error(err);
                res.status(200).json({ status: false, message: 'Unable to upload image, check the resume size and type' });
            } else {
                next();
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: false, message: 'Internal server error' });
    }
  };