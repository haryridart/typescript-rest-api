# Contact API Spec

## Create Contanct

Endpoint: POST /api/contacts

Request Header:
- X-API-TOKEN: token

Request Body:

```json
{
    "first_name": "Hary",
    "last_name": "Ridart",
    "email": "haryridart@me.com",
    "phone": "123-456-7890"
}
```

Response Body (Success):

```json
{
    "data": {
        "id": 1,
        "first_name": "Hary",
        "last_name": "Ridart",
        "email": "haryridart@me.com",
        "phone": "123-456-7890"
    }    
}
```

Response Body (Failed):

```json
{
   "error": "first_name is required, ..." 
}
```


## Get Contact Detail


Endpoint: GET /api/contacts/:idContact

Request Header:
- X-API-TOKEN: token

Response Body (Success):

```json
{
    "data": {
        "id": 1,
        "first_name": "Hary",
        "last_name": "Ridart",
        "email": "haryridart@me.com",
        "phone": "123-456-7890"
    }    
}
```

Response Body (Failed):

```json
{
   "error": "Not Found" 
}
```


## Update Contact


Endpoint: PUT /api/contacts/:idContact

Request Header:
- X-API-TOKEN: token

Request Body:

```json
{
    "first_name": "Hary",
    "last_name": "Ridart",
    "email": "haryridart@me.com",
    "phone": "123-456-7890"
}
```

Response Body (Success):

```json
{
    "data": {
        "id": 1,
        "first_name": "Hary",
        "last_name": "Ridart",
        "email": "haryridart@me.com",
        "phone": "123-456-7890"
    }    
}
```

Response Body (Failed):

```json
{
   "error": "first_name is required, ..." 
}
```


## Remove Contact

Endpoint: DELETE /api/contacts/:idContact

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
   "error": "Not Found" 
}
```


## Search Contact

Endpoint: GET /api/contacts

Query Parameter:
- name: string, contact first name or contact last name, optional
- phone: string, contact phone number, optional
- email: string, contact email, optional
- page: number, default 1
- size: number, default 10


Request Header:
- X-API-TOKEN: token

Response Body (Success):

```json
{
    "data": [
        {
            "id": 1,
            "first_name": "Hary",
            "last_name": "Ridart",
            "email": "haryridart@me.com",
            "phone": "123-456-7890"
        }   ,
        {
            "id": 2,
            "first_name": "Fenia",
            "last_name": "Dwi",
            "email": "feniadwi@me.com",
            "phone": "123-456-8890"
        }
    ],
    "paging": {
        "current_page": 1,
        "total_page": 10,
        "size": 10
    }
}
```

Response Body (Failed):

```json
{
   "error": "Unauthorized, ..." 
}
```


