## Run Service
1. Install node:20.10.0
2. npm install
3. docker compose up
4. npm run dev

Service will run on port 3000
http://localhost:3000

## Create Short URL
POST /create
{
  "url": "https://longurl.com/123/some-text?foo=bar"
}

## Get Long URL
GET /s/<short-url>

Response
301 to <long-url>
404 if not found
