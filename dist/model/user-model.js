"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toUserResponse = toUserResponse;
/**
+ * Converts a User object to a UserResponse object.
+ *
+ * @param {User} user - The User object to be converted.
+ * @return {UserResponse} The UserResponse object.
+ */
function toUserResponse(user) {
    return {
        username: user.username,
        name: user.name
    };
}
