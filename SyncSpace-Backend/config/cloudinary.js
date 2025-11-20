import {v2 as cloudinary} from 'cloudinary'
import dotenv from 'dotenv';

dotenv.config();

const cloudinary_cloud = process.env.CLOUDINARY_CLOUD
const cloudinary_api = process.env.CLOUDINARY_API
const cloudinary_secret = process.env.CLOUDINARY_SECRET

cloudinary.config({
    cloud_name: cloudinary_cloud,
    api_key: cloudinary_api,
    api_secret: cloudinary_secret
});

export default cloudinary