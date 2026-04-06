## Authentication Work Flow :

- User logs in via OAuth
- Backend fetches user email
- Check if user exists in DB
- If new → create user with `pending` status
-  Admin reviews and approves/rejects
- Approved users can access recruiter dashboard