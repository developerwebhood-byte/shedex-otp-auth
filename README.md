# OTP Email API (Node + Express)

Single endpoint:
POST /api/generateotpandsendemail

Body:
{
  "email": "test@example.com"
}

## Setup
1) Install dependencies
npm install

2) Create .env file
Copy .env.example -> .env and fill Gmail user + app password

3) Run
npm run dev
or
npm start

## Test
POST http://localhost:5000/api/generateotpandsendemail
Body JSON:
{
  "email": "your@email.com"
}
