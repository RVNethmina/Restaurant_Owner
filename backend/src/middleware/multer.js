// Import the multer middleware for handling multipart/form-data (primarily used for file uploads)
import multer from "multer";

// Define a storage engine using multer's diskStorage
// This configuration determines how files are stored on disk
const storage = multer.diskStorage({
    // The 'filename' function determines the name of the file that is saved on disk
    // It receives the request object, the file object, and a callback function
    filename: function(req, file, callback) {
        // Here we use the original name of the uploaded file
        // The first parameter of the callback is null (indicating no error)
        // The second parameter is the desired filename (in this case, file.originalname)
        callback(null, file.originalname);
    }
});

// Initialize the multer middleware using the defined storage configuration
const upload = multer({ storage });

// Export the configured multer middleware so it can be used in routes to handle file uploads
export default upload;
