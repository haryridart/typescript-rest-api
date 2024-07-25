import { prismaClient } from "../application/database";
import { ResponseError } from "../error/response-error";
import {CreateUserRequest, toUserResponse, UserResponse} from "../model/user-model";
import { UserValidation } from "../validation/user-validation";
import { Validation } from "../validation/validation";
import bcrypt from "bcrypt";

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
}

