import ApiError from "@/utils/ApiError.js";

function notFound(req,res,next){
    next(ApiError.notFound(`Route ${req.method} ${req.originalUrl} not found`));
}

const errorHandler=(err,req,res,next)=>{
    if(err instanceof ApiError){
        return res.status(err.statusCode).json({
            success:false,
            message:err.message,
            details:err.details || null
        });

    }

    //Unexpected errors
    console.error("Unhandled error:" , err);

    return res.status(500).json({
        success:false,
        message:"Internal server error"
    })
};

export default errorHandler;