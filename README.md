# SLSEA Solar Generation Data API

REST API for managing real-time and historical solar generation data for the Sri Lanka Sustainable Energy Authority (SLSEA).

## About the Project

This project is a REST API developed for the Web API Development coursework.

The API is designed to manage solar power generation data from solar installations in Sri Lanka.

The system includes:

- Provinces
- Districts
- Grid substations
- Solar installations
- Generation readings
- Users and authentication

The API uses MongoDB Atlas to store the data and JWT for user authentication.

## Technologies Used

- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- JWT
- bcryptjs
- Helmet
- CORS
- OpenAPI / Swagger UI
- Vercel

## Main API Resources

The API provides the following resources:

### Authentication

- POST /auth/login

Used to login users and receive a JWT token.

### Provinces

- GET /provinces
- GET /provinces/{provinceId}
- GET /provinces/{provinceId}/districts

### Districts

- GET /districts
- GET /districts/{districtId}
- GET /districts/{districtId}/substations

### Grid Substations

- GET /grid-substations
- GET /grid-substations/{substationId}
- GET /grid-substations/{substationId}/installations

### Solar Installations

- GET /installations
- POST /installations
- GET /installations/{installationId}
- PUT /installations/{installationId}
- DELETE /installations/{installationId}

### Generation Readings

- GET /installations/{installationId}/readings/latest
- GET /installations/{installationId}/readings
- POST /installations/{installationId}/readings
- GET /readings
- GET /readings/{readingId}

## Authentication

The API uses JWT authentication.

A user first sends their login details to:

POST /auth/login

After a successful login, the API returns a JWT token.

The token is then sent with protected API requests using:

Authorization: Bearer <token>

Different users have different access levels based on their jurisdiction.

The main user types are:

- National user
- Province user
- District user

This prevents users from accessing data outside their allowed area.

## Solar Generation Readings

Generation readings are connected to a solar installation.

A reading contains information such as:

- Installation ID
- Timestamp
- Power generation in kW
- Cumulative energy in kWh
- Voltage

Readings can be submitted by an authenticated device/user for the related solar installation.

The API also supports getting the latest reading and historical readings.

## API Documentation

Swagger UI is available at:

https://slsea-solar-generation-api.vercel.app/api-docs/

The OpenAPI specification is available at:

https://slsea-solar-generation-api.vercel.app/openapi.json

Swagger UI can be used to view and test the API endpoints.

## Live API

The deployed API is available at:

https://slsea-solar-generation-api.vercel.app/

## Running the Project Locally

1. Clone the repository

```bash
git clone https://github.com/Hasith819/slsea-solar-generation-api.git
```

2. Go to the project folder

```bash
cd slsea-solar-generation-api
```

3. Install the packages

```bash
npm install
```

4. Create the .env file

Create a .env file in the project root.

Add:

```env
PORT=3000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

Do not upload the .env file to GitHub.

5. Start the API

For development:

```bash
npm run dev
```

Or:

```bash
npm start
```

The API will normally run at:

```text
http://localhost:3000
```

Swagger documentation will be available at:

```text
http://localhost:3000/api-docs
```

## Database

The project uses MongoDB Atlas.

The main database contains data for:

- Provinces
- Districts
- Grid substations
- Solar installations
- Generation readings
- Users

The project also includes a seed script for adding the sample data.

Run:

```bash
npm run seed
```

## Deployment

The API is deployed using Vercel.

The deployment uses environment variables for the MongoDB connection and JWT secret.

The current live API is:

https://slsea-solar-generation-api.vercel.app/

## Security

The API includes several security features:

- JWT authentication
- Password hashing using bcryptjs
- Role and jurisdiction-based authorization
- Helmet security headers
- CORS
- Input validation
- Protected API routes
- Error handling

Sensitive environment variables are stored outside the source code.

## HTTP Features

The API also supports:

- HTTP status codes
- Pagination
- Filtering
- Sorting
- Date filtering for generation readings
- ETag based conditional requests
- Last-Modified headers
- 304 Not Modified responses

## Project Structure

```text
slsea-solar-generation-api/
├── data/
├── docs/
│   └── openapi/
├── src/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   ├── app.js
│   └── server.js
├── openapi.js
├── vercel.json
├── package.json
└── README.md
```

## Purpose of the Project

The main purpose of this API is to provide a central system for collecting and accessing solar generation data.

It allows authorized users to view solar generation information and allows authenticated devices to submit generation readings for their own installations.