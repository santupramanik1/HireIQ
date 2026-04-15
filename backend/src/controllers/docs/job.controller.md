## createJob:

### Parameter:

- req(Request): Incoming HTTP request (contains body, user, etc.)
- res(Response): Used to send response back to client

### Wroking:

- Check if the `user` property is exist in `req` object or not .(We attach the `user` payload in the middleware).

- Takes all fields from request body
- Assign the `createdBy` by logged-in user ID.
- Creates a Mongoose document and save it.
- return

```js
{
  "success": true,
  "message": "Job created successfully",
  "job":newJob
}

```

- If validation error occurs then it extract the error message only for clean response
