// import cloudinary from "../config/cloudinary.js";
import {v2 as cloudinary} from 'cloudinary';
import multer from 'multer';
import dotenv from 'dotenv'
import {CloudinaryStorage} from 'multer-storage-cloudinary';

dotenv.config();

const cloudinary_cloud = process.env.CLOUDINARY_CLOUD
const cloudinary_api = process.env.CLOUDINARY_API
const cloudinary_secret = process.env.CLOUDINARY_SECRET

cloudinary.config({
    cloud_name: cloudinary_cloud,
    api_key: cloudinary_api,
    api_secret: cloudinary_secret
});

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'SyncSpace/users',
        format: 'webp',
        transformation: [
            {width: 800, height: 800, crop: 'limit'},
            {quality: 90},
            {fetch_format: 'auto'}
        ]
    }
});

export const profilePicUpload = multer({
    storage: storage,
    limits: {fileSize: 5 * 1024 * 1024},
    fileFilter: (req, file, cb) => {
        if(/^image\/(jpeg|jpg|png|gif|webp)$/.test(file.mimetype)) {
            console.log("FILE MIMETYPE:", file.mimetype);
            cb(null, true)
        } else {
            cb(new Error('Only image files(JPEG, PNG, GIF, Webp) are allowed'), false)
        }
    }
});
