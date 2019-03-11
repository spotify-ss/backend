# Instructions
test user login : 
```javascript
{
    "username": "user",
    "password": "password"
}
```

## End Points

### /api/users/register

- **POST** 

Expects body:
```javascript
{
    "username": string,
    "password": string
}
```
username must be unique

password must be at least 8 characters long

Returns:
```javascript
username,
jsonWebToken // use this for the Authorization header
```

### /api/users/login

- **POST**

Expects body:
```javascript
{
    "username": string,
    "password": string,
}
```

Returns:
```javascript
{
    jsonWebToken
}
```