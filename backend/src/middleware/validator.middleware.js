import ApiError from "../utils/ApiError.js";

export const validate = (schema) => (req, res, next) => {
    const result = schema.safeParse(req.body);

    if (result.success) {
        req.body = result.data;
        return next();
    }

    const errors = result.error.issues.map((issue) => ({
        field: issue.path.join("."),
        message: issue.message
    }));

    throw ApiError.badRequest("Invalid request data", errors);
};