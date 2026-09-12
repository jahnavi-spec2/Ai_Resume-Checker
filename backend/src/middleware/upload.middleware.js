import multer from "multer";
import ApiError from "../utils/ApiError.js";

const storage=multer.memoryStorage();

function fileFilter(req,file,cb){
    if(file.mimetype!=="application/pdf"){
        return cb(ApiError.badRequest("Only PDF files are allowed"));
    }
    cb(null,true);
}

export const uploadMiddleware= multer ({
    storage,fileFilter,
    limits:{fileSize: 5*1024*1024},

}).single("file");