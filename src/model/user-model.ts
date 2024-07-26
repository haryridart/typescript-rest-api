import { User } from "@prisma/client";

/**
 * The response body for user operations.
 * It contains the username, name, and optional token.
 */
export type UserResponse = {
    username: string;
    name: string;
    token?: string;
}
/**
 * The request body for creating a new user.
 */
export type CreateUserRequest = {
    username: string;
    name: string;
    password: string;
}
export type UpdateUserRequest = {
    name?: string;
    password?: string;
}
export type LoginUserRequest = {
    username: string;
    password: string;
}
/**
+ * Converts a User object to a UserResponse object.
+ *
+ * @param {User} user - The User object to be converted.
+ * @return {UserResponse} The UserResponse object.
+ */
export function toUserResponse(user: User): UserResponse {
    return {
        username: user.username,
        name: user.name
    }
}