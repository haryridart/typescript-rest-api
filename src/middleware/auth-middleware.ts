import { Request, Response, NextFunction } from "express";
import { prismaClient } from "../application/database";
import { UserRequest } from "../type/user-request";
export const authMiddleware = async (req: UserRequest, res: Response, next: NextFunction) => {
    const token = req.header('X-API-TOKEN');
    if(!token){
        res.status(401).json({
            errors: 'Unauthorized'
        }).end();
    }else{
        const user = await prismaClient.user.findFirst({
            where: {
                token: token
            }
        });
        if(!user){
            res.status(401).json({
                errors: 'Unauthorized'
            });
        }else{
            req.user = user;
            next();
            return;
        }
    }
}