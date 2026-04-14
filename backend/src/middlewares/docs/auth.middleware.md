### isAuthenticated():

#### Parameter:

- req(Request): Contains headers (Authorization token)
- res(Response): Used to send error response
- next(NextFunction): Calls next middleware/controller

#### Working:

- Input (from request headers)
- `Authorization: Bearer <accessToken>`

Example:
Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.xxx.yyy`

- Check if the header contain `Bearer` token or not if not return

```js
return { message: "Unauthorize" };
```

- If the header contain `Bearer` token then extract the token from it

- Verify the access token using `ACCESS_SECRECT`
- Decode Payload
- Example

```js
{ userId: "123",
email: "user@gmail.com",
role: "recruiter"
}
```

- Attach User to Request
- Now available in next controllers:

```js
req.user = {
  userId,
  email,
  role
};
```

- Passes control to next route handler
