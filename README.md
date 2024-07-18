## Run Service
1. Install node:20.10.0 / By nvm, install `nvm install 20.10.0`, to use, `nvm use 20.10.0`
2. run `npm install`
3. open a separate terminal and run `docker compose up`
4. `npm run dev`

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
