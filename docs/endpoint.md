### HireIQ API Documentation

**Base URL:** `/api`

---

#### 1. Authentication (Recruiter)

Endpoints for managing recruiter sessions and profiles.

| Method | Endpoint           | Auth Required | Description                                                       |
| :----- | :----------------- | :------------ | :---------------------------------------------------------------- |
| `POST` | `/api/auth/login`  | No            | Authenticate a user with email/password and return a JWT/session. |
| `GET`  | `/api/auth/google` | No            | Initiates the Google OAuth login flow.                            |
| `GET`  | `/api/auth/me`     | Yes           | Fetch the profile details of the currently authenticated user.    |
| `POST` | `/api/auth/logout` | Yes           | Clears the current user's session/cookies.                        |

---

## 2. Job Management (Recruiter)

Protected endpoints used by recruiters to manage job postings on the platform.

| Method   | Endpoint        | Auth Required | Description                                                                           |
| :------- | :-------------- | :------------ | :------------------------------------------------------------------------------------ |
| `GET`    | `/api/jobs`     | Yes           | Fetch a list of all jobs created by the recruiter. Supports pagination and filtering. |
| `POST`   | `/api/jobs`     | Yes           | Create a new job posting.                                                             |
| `PUT`    | `/api/jobs/:id` | Yes           | Update an existing job posting by its ID.                                             |
| `DELETE` | `/api/jobs/:id` | Yes           | Delete a job posting by its ID.                                                       |

---

## 3. Candidate Application Flow (Public)

Public endpoints used by candidates to view jobs and submit applications.

> **Frontend Context:** > When a candidate visits `https://hireiq.com/jobs/65f1a2b.../apply` in their browser, the React frontend will trigger the following sequence of API calls:

| Method | Endpoint                                    | Description                                                                                                              |
| :----- | :------------------------------------------ | :----------------------------------------------------------------------------------------------------------------------- |
| `GET`  | `/api/jobs/:id`                             | Fetches the public details of the job (Title, Requirements) to display on the application form.                          |
| `POST` | `/api/jobs/:id/applications/extract-resume` | Accepts a `.pdf` file via `multipart/form-data`, uploads it to Cloudinary, and triggers the AI to extract autofill data. |
| `POST` | `/api/jobs/:id/applications`                | Accepts the final, verified JSON form data, triggers the AI match engine, and saves the application to the database.     |

---
