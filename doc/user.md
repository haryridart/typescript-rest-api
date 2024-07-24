# User API Spec

## Register User 

Endpoint: POST /api/users

Request Body:
```json
{
    "username": "haryridart",
    "password": "password123",
    "name": "Hary Ridart"
}
```

Response Body (Success):
```json
{
    "data": {
        "username": "haryridart",
        "name": "Hary Ridart"
    }
}
```

Response Body (Failed):
```json
{
   "error": "User already exists" 
}
```

## Login User

Endpoint: POST /api/login

Request Body:
```json
{
    "username": "haryridart",
    "password": "password123"
}
```

Response Body (Success):
```json
{
    "data": {
        "username": "haryridart",
        "name": "Hary Ridart",
        "token": "uuid"
    }
}
```

Response Body (Failed):
```json
{
   "error": "User or password is incorrect" 
}
```

## Get User

Endpoint: GET /api/users/current

Request Header:
- X-API-TOKEN: token

Response Body (Success):
```json
{
    "data": {
        "username": "haryridart",
        "name": "Hary Ridart"
    }
}
```

Response Body (Failed):
```json
{
   "error": "Unauthorized, ..." 
}
```

## Update User

Endpoint: PATCH /api/users/current

Request Header:
- X-API-TOKEN: token

Request Body:
```json
{
    "password": "password123", // optional
    "name": "Hary Ridart" // optional
}
```

Response Body (Success):
```json
{
    "data": {
        "username": "haryridart",
        "name": "Hary Ridart"
    }
}
```

Response Body (Failed):
```json
{
   "error": "Unauthorized, ..." 
}
```

## Logout User 

Endpoint: DELETE /api/users/current

Request Header:
- X-API-TOKEN: token

Response Body (Success):
```json
{
    "data": "OK"
}
```

Response Body (Failed):
```json
{
   "error": "Unauthorized, ..." 
}
```