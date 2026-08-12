import ApiError from "@/utils/ApiError.js";

function notFound(req,res,next){
    next(ApiError.notFound(`Route ${req.method} ${req.originalUrl} not found`));
}

const errorHandler=(err,res,req,next)=>{
    if(err instanceof ApiError){
        return res.status(err.statusCode).json({
            sucess:false,
            message:err.message,
            details:err.details || null
        });

    }

    //Unexpected errors
    console.error("Unhandled error:" , err);

    return res.status(500).json({
        sucess:false,
        message:"Internal server error"
    })
};

export default errorHandler;