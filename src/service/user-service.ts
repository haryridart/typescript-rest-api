import { response } from "express";
import { prismaClient } from "../application/database";
import { ResponseError } from "../error/response-error";
import {CreateUserRequest, LoginUserRequest, toUserResponse, UserResponse} from "../model/user-model";
import { UserValidation } from "../validation/user-validation";
import { Validation } from "../validation/validation";
import bcrypt from "bcrypt";
import {v4 as uuid} from "uuid";

/**
 * A class that provides methods for user service operations.
 */
export class UserService{
        /**
     * Registers a new user.
     *
     * @param {CreateUserRequest} request - The request body for creating a new user.
     * @return {Promise<UserResponse>} A promise that resolves to the UserResponse object of the newly created user.
     * @throws {ResponseError} If the username already exists.
     */
    static async register(request: CreateUserRequest): Promise<UserResponse> {
        const registerRequest = Validation.validate(UserValidation.REGISTER, request);
        const totalUserWithSameUsername = await prismaClient.user.count({
            where: {
                username: registerRequest.username
            }
        });

        if (totalUserWithSameUsername > 0) {
            throw new ResponseError(400, "Username already exists");
        }
        registerRequest.password = await bcrypt.hash(registerRequest.password, 10);

        const user = await prismaClient.user.create({
            data: registerRequest
        });
        return toUserResponse(user);
    }
    static async login(request: LoginUserRequest): Promise<UserResponse> {
        const loginRequest = Validation.validate(UserValidation.LOGIN, request);
        let user = await prismaClient.user.findUnique({
            where: {
                username: loginRequest.username
            }
        });
        if (!user) {
            throw new ResponseError(401, "Username or password is incorrect");
        }
        const isPasswordValid = await bcrypt.compare(loginRequest.password, user.password);
        if (!isPasswordValid) {
            throw new ResponseError(401, "Username or password is incorrect");
        }
        
        user = await prismaClient.user.update({
            where: {
                username: user.username
            },data: {
                token: uuid()
            }
        });

        const response = toUserResponse(user);
        response.token = user.token!;
        return response;
    }
}

