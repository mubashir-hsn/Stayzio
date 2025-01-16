// import { v2 as cloudinary } from "cloudinary";
// import fs from 'fs';




// const uploadOnCloudinary = async (localFilePath) => {
//     try {

//         if (!localFilePath) return 'Path not found'
//         const uploadResult = await cloudinary.uploader.upload(localFilePath).catch((error) => { console.log(error) });

//         console.log('File uploaded successfully on cloudinary: ', uploadResult.url);
//         return uploadResult
//     }
//     catch (error) {
//         fs.unlinkSync(localFilePath) // remove locally saved temporary file as upload option failed.
//         return null
//     }
// }

// export { uploadOnCloudinary }