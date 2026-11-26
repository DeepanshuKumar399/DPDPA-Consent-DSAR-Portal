# Database Design

## Collections

### User
| Field | Type | Notes |
|-------|------|-------|
| name | String | required |
| email | String | unique, required |
| password | String | bcrypt hashed |
| role | String | 'user' or 'admin' |

### Consent
| Field | Type | Notes |
|-------|------|-------|
| user | ObjectId | ref: User |
| purpose | String | e.g. Marketing |
| status | String | 'granted' or 'revoked' |
| grantedAt | Date | |
| revokedAt | Date | set on revoke |

### PrivacyRequest
| Field | Type | Notes |
|-------|------|-------|
| user | ObjectId | ref: User |
| type | String | access/correction/erasure/portability/nomination |
| description | String | |
| status | String | pending/in_progress/completed/rejected |
| adminNote | String | set by admin |

### AuditLog
| Field | Type | Notes |
|-------|------|-------|
| user | ObjectId | ref: User |
| action | String | e.g. CONSENT_GRANTED |
| entity | String | e.g. Consent |
| entityId | ObjectId | |
| details | String | |
