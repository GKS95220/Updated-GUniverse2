# Auth Testing Playbook

## Credentials
See /app/memory/test_credentials.md for admin email/password.

## Step 1: MongoDB Verification
```
mongosh
use test_database
db.users.find({role: "admin"}).pretty()
```
Verify: bcrypt hash starts with `$2b$`, unique index on users.email, index on login_attempts.identifier.

## Step 2: API Testing
```
curl -c cookies.txt -X POST $API/api/auth/login -H "Content-Type: application/json" -d '{"email":"<admin email>","password":"<admin password>"}'
curl -b cookies.txt $API/api/auth/me
curl -b cookies.txt $API/api/leads
curl -b cookies.txt -X POST $API/api/auth/logout
```
Login returns the user object and sets httpOnly `access_token` + `refresh_token` cookies (Secure, SameSite=None). `/me` and `/leads` require the cookie. Wrong password returns 401; 5 failed attempts lock for 15 min (429).

## Step 3: Frontend
Visit /admin — login with admin credentials, leads table loads, logout returns to login card.
