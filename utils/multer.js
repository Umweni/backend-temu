const multer = require('multer');
const path = require('path');

// Uses the operating system's default temporary folder to store files
module.exports = multer({
    storage: multer.diskStorage({}), //Take the file and put it in the computer's temporary storage folder for now.
    fileFilter: (req, file, cb) => {
        let ext = path.extname(file.originalname).toLowerCase();
        
        // List of allowed image extensions
        const allowedExtensions = [
            ".jpg", ".jpeg", ".png", ".gif", ".webp", ".avif"
        ];

        /**
         * Multer is a separate process running in the background. When it finishes checking your file, 
         * it needs a way to "call back" to the main program to tell it whether to proceed or stop.
         * 
         * The cb (callback) function usually expects two pieces of information, like a "Status Report":
         * cb(The Error [optional, if any], The Result [Boolean (true or false])
         */
        if (!allowedExtensions.includes(ext)) {
            cb(new Error("File type is not supported"), false);
            return;
        }
        cb(null, true);
    }
});
