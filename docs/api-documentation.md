# API Documentation

Base URL: `http://localhost:5000/api`

## Auth
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /auth/register | Register new user |
| POST | /auth/login | Login |
| GET | /auth/profile | Get current user (protected) |

## Consents
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /consents | Get user's consents |
| POST | /consents | Grant consent `{ purpose }` |
| PUT | /consents/:id/revoke | Revoke a consent |

## Requests
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /requests | Get user's requests |
| POST | /requests | Create request `{ type, description }` |

## Admin
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /admin/requests | Get all requests |
| PUT | /admin/requests/:id | Update request `{ status, adminNote }` |
| GET | /admin/audit-logs | Get audit logs |
