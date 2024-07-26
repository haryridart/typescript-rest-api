import { ZodError } from "zod"
import { Request, Response, NextFunction } from "express";
import { ResponseError } from "../error/response-error";
/**
 * Middleware function to handle errors in the application.
 *
 * @param {Error} error - The error object.
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @param {NextFunction} next - The next function.
 * @return {Promise<void>} Promise that resolves to void.
 */
export const errorMiddleware = async (error: Error, req: Request, res: Response, next: NextFunction) => {
    if(error instanceof ZodError){
        res.status(400).json({
            errors: `Validation Error: ${JSON.stringify(error)}`
        });
    }else if (error instanceof ResponseError){
        res.status(error.status).json({
            errors: error.message
        });
    }else{
        res.status(500).json({
            errors: error.message
        });
    }
}