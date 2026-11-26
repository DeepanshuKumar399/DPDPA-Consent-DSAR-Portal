# DPDPA Consent Management & DSAR Portal

A full-stack portal for managing user consents and Data Subject Access Requests (DSARs) under India's Digital Personal Data Protection Act (DPDPA).

## Tech Stack
- **Frontend**: React + Vite + React Router
- **Backend**: Node.js + Express
- **Database**: MongoDB (Mongoose)
- **Auth**: JWT

## Getting Started

### Backend
```bash
cd backend
npm install
# Configure .env (MONGO_URI, JWT_SECRET)
npm run dev
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

## Features
- User registration & login
- Consent grant/revoke with history
- DSAR request submission (access, correction, erasure, portability, nomination)
- Admin dashboard to manage requests
- Full audit logging
