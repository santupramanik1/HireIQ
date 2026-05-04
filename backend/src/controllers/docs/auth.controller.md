## Authentication Work Flow :

### login()

#### Parameter

- req(Request) :Incoming HTTP request (not used much here)
- res(Response): Used to set cookies and redirect user

#### working:

- generate state
- generate code_verifier
- these values are stored into the httpOnly cookies on clients browser
- The user is sent to Google's consent screen with requested scopes (profile, email),where users can see multiple their multiple email account

### googleCallback()

#### Parameter:

- req(Request):contain query parameter like(state,code) and cookies
- res (Response):used to send the response and set cookies

#### Working

- Compares the `state` from Google with the `storedState` in the cookies.

- Uses the `code` and `code_verifier` to get an ID Token from Google.

- Decodes the Google ID token to get user details `(email, name, picture)`

- If the user doesn't exist, a new record is created in MongoDB with the `recruiter` role

- If the user is exist check if the providerID is linked to the users account or not if not thenk linked them.
- Generates a short-lived Access Token(15m diration).
- Generates a long-lived Refresh Token(30m duration).
- Stores refresh token in cookie
- Clears temporary cookies

#### Return

```js
{ success: true,
 accessToken: string,
 refreshToken: string,
 user: {
    id: string,
    name: string,
    role: string }
}
```

### refreshTokenController

#### Parameter:

- req(Request): contain cookies
- res(Response):send new acess token

#### Working

- Read the refresh token from the cookies
- If the refresh token is not expired then
- then extract the payload from the refresh token
- Generates new access token

#### Return

```js
{
  accessToken: string;
}
```

### NOTE:

- `Access token` is used to access the services in the application without it we are not able access the service in secure system ,but it has very short life time ex:15m.

- When the access token is expired then `Refresh token` is used to generate the new access token ,but it has long life time ex:30m
