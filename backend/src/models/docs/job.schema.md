| Field            | Type     | Validation | Description                                                 |
| ---------------- | -------- | ---------- | ----------------------------------------------------------- |
| createdBy        | ObjectId | Required   | Links the job to the Recruiter who posted it.               |
| status           | String   | Enum       | Controls visibility: draft, open, closed, archived.         |
| title            | String   | Required   | The official name of the position(Full Stack Develeoper).   |
| description      | String   | Required   | High-level summary of the role.                             |
| type             | String   | Enum       | The nature of employment (e.g., Full-time, Internship).     |
| salary           | Object   | Optional   | Contains min, max, and currency fields.                     |
| department       | String   | Required   | Which team the role belongs to (e.g., Engineering, HR).     |
| location         | String   | Required   | Physical location or "Remote".                              |
| responsibilities | Array    | -          | A list of day-to-day tasks.                                 |
| requirements     | Array    | -          | Educational or professional prerequisites.                  |
| skills           | Array    | -          | Keywords used for filtering/AI matching (e.g., MERN stack). |
