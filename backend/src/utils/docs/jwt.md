### generateAccessToken()
 #### Paramater:
 - payload:
 ```js
 { userId: "123", 
 email: "user@gmail.com", 
 role: "recruiter" 
 }
 ```
 #### Working:
 - Uses jwt.sign()
- Signs payload with ACCESS_SECRET
- Sets expiry to 15 minutes

#### Return:
- JWT Access Token
***
### generateRefreshToken()
 #### Paramater:
 - payload:
 ```js
 { userId: "123", 
 email: "user@gmail.com", 
 role: "recruiter" 
 }
 ```
 #### Working:
 - Uses jwt.sign()
- Signs payload with REFRESH_SECRET
- Sets expiry to 30 minutes

#### Return:
- JWT Refresh Token
***
### verifyAccessToken(token)
#### Parameter:
- token(string): like `eyJhbGciOiJIUzI1NiIsInR5cCI6'
- Verifies token using `ACCESS_SECRET`
- Decodes payload

#### Returns 
- TokenPayload
```js
{ 
userId: "123", 
email: "user@gmail.com", 
role: "recruiter" 
}
```

***
### verifyRefreshToken(token)
#### Parameter:
- token(string): like `eyJhbGciOiJIUzI1NiIsInR5cCI6'
- Verifies token using `REFRESH_SECRET`
- Decodes payload

#### Returns 
- TokenPayload
```js
{ 
userId: "123", 
email: "user@gmail.com", 
role: "recruiter" 
}
```
