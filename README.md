# My Project

This project is a media database platform and video-sharing application inspired by IMDb and YouTube, respectively. It includes features like user authentication, watchlist management, media listings, and more.

## Features

- User Authentication (Register, Login, Logout)
- Watchlist Management
- Media Listings (Movies, TV Series, Trending, Popular)
- Search Functionality

## Technologies Used
- Node.js
- Express
- MongoDB

## Project Structure

├── node_modules/
├── .env
├── .gitignore
├── detailsData.json
├── detailsExport.js
├── fandomData.js
├── fandomData.json
├── note.md
├── schema.md
├── src/
│   ├── components/
│   ├── pages/
│   ├── redux/
│   ├── styles/
│   ├── utils/
│   └── App.js
│   └── index.js
└── README.md

## Setup environment variables

- PORT = your_port

MONGODB_URI = your_mongoDB_URL

JWT_SECRET_KEY = your_secret_key


## Usage

### Authentication Endpoints

#### Register

- **URL:** `/api/register`
- **Method:** `POST`
- **Body:**
  ```json
  {
      "name": "John Doe",
      "email": "johndoe@example.com",
      "password": "yourpassword"
  }
  
Login
URL: /api/login
Method: POST
Body:
json
Copy code
{
    "email": "johndoe@example.com",
    "password": "yourpassword"
}
Logout
URL: /api/logout
Method: POST

Delete User
URL: /api/user/:id
Method: DELETE
Media Endpoints

Get Movies
URL: /api/movies
Method: GET

Get TV Series
URL: /api/tv-series
Method: GET

Get Trending
URL: /api/trending
Method: GET

Get Popular
URL: /api/popular
Method: GET

Get Details
URL: /api/details/:id/:mediatype
Method: GET

