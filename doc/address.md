# Address API Spec

## Create Address

Endpoint : POST /api/contacts/:idContact/addresses

Request Header:
- X-API-TOKEN: token

Request Body:
```json
{
    "street": "123 Main St",
    "city": "Anytown",
    "province": "Java",
    "country": "Indonesia",
    "postal_code": "12345"
}
```

Response Body (Success):
```json
{
    "data": {
        "id": 1, 
        "street": "123 Main St",
        "city": "Anytown",
        "province": "Java",
        "country": "Indonesia",
        "postal_code": "12345"    
    }
}
```
Response Body (Failed):
```json
{
   "error": "street cannot be empty" 
}
```

## Get Address Detail

Endpoint : GET /api/contacts/:idContact/addresses:idAdress

Request Header:
- X-API-TOKEN: token

Response Body (Success):
```json
{
    "data": {
        "id": 1, 
        "street": "123 Main St",
        "city": "Anytown",
        "province": "Java",
        "country": "Indonesia",
        "postal_code": "12345"    
    }
}
```
Response Body (Failed):
```json
{
   "error": "address not found" 
}
```

## Update Address

Endpoint : PUT /api/contacts/:idContact/addresses/:idAdress

Request Header:
- X-API-TOKEN: token

Request Body:
```json
{
    "street": "123 Main St",
    "city": "Anytown",
    "province": "Java",
    "country": "Indonesia",
    "postal_code": "12345"
}
```

Response Body (Success):
```json
{
    "data": {
        "id": 1, 
        "street": "123 Main St",
        "city": "Anytown",
        "province": "Java",
        "country": "Indonesia",
        "postal_code": "12345"    
    }
}
```
Response Body (Failed):
```json
{
   "error": "street cannot be empty" 
}
```

## Remove Address

Endpoint : DELETE /api/contacts/:idContact/addresses/:idAdress

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
   "error": "Address is not found" 
}
```

## List Address
Endpoint : GET /api/contacts/:idContact/addresses

Request Header:
- X-API-TOKEN: token

Response Body (Success):
```json
{
    "data": [
        {
            "id": 1, 
            "street": "123 Main St",
            "city": "Anytown",
            "province": "Java",
            "country": "Indonesia",
            "postal_code": "12345"    
        },
        {
            "id": 2, 
            "street": "113 Main St",
            "city": "Anytown 2",
            "province": "Sumatra",
            "country": "Indonesia",
            "postal_code": "23523"    
        }
    ]
```

Response Body (Failed):
```json
{
   "error": "contact is not found" 
}
```