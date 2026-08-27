# Local Service Marketplace

A full-stack marketplace for discovering local service providers, booking services, managing bookings, and handling reviews and payments.

## Features

- Customer registration and login with JWT authentication
- Browse services and provider profiles
- Book services and view booking history
- Provider profile and dashboard workflows
- Provider service management
- Customer reviews and provider responses
- Razorpay order creation and payment verification
- MongoDB persistence through Mongoose
- React single-page frontend with protected API requests

## Tech Stack

- **Frontend:** React 18, React Router, Axios, React Hot Toast
- **Backend:** Node.js, Express, Morgan, CORS
- **Database:** MongoDB with Mongoose
- **Authentication:** JWT and bcryptjs
- **Payments:** Razorpay
- **Deployment:** Vercel frontend configuration with an API proxy to Render

## Project Structure

```text
.
├── client/                 React application
│   └── src/
│       ├── components/     Reusable UI components
│       ├── context/        Authentication context
│       ├── pages/          Application screens
│       └── utils/          API client
├── config/                 Database configuration
├── middleware/             Authentication and error middleware
├── models/                 Mongoose models
├── routes/                 Express API routes
├── server.js               Express server entry point
└── vercel.json             Frontend deployment and API routing
```

## Requirements

- Node.js 18 or newer
- npm
- A MongoDB database, local or hosted
- Razorpay credentials if payment features are enabled

## Installation

Install the backend and frontend dependencies from the repository root:

```bash
npm run install-all
```

Create a `.env` file in the project root:

```env
MONGODB_URI=mongodb://127.0.0.1:27017/service-marketplace
JWT_SECRET=replace-with-a-long-random-secret
JWT_EXPIRE=7d
PORT=5000
CLIENT_URL=http://localhost:3000

# Required for Razorpay payment flows
RAZORPAY_KEY_ID=your-razorpay-key-id
RAZORPAY_KEY_SECRET=your-razorpay-key-secret
```

Keep `.env` out of version control and do not expose `RAZORPAY_KEY_SECRET` or `JWT_SECRET` in the frontend.

## Running Locally

Start both the API and React development server:

```bash
npm run dev-all
```

Or run them separately in two terminals:

```bash
npm run dev       # API on http://localhost:5000
npm run client    # React app on http://localhost:3000
```

The frontend proxies `/api` requests to the local API. The API health check is available at:

```text
GET http://localhost:5000/api/health
```

## Available Routes

### Frontend routes

- `/` - Home page
- `/services` - Service directory
- `/provider/:id` - Provider profile
- `/book/:serviceId` - Booking flow
- `/my-bookings` - Current user's bookings
- `/login` - Login
- `/register` - Registration

### API route groups

| Base path | Purpose |
| --- | --- |
| `/api/auth` | Registration, login, and current-user lookup |
| `/api/providers` | Provider listing, profiles, and dashboard statistics |
| `/api/services` | Service listing and provider service management |
| `/api/bookings` | Booking creation, listing, and status updates |
| `/api/reviews` | Provider reviews and provider responses |
| `/api/payments` | Razorpay order creation and verification |
| `/api/health` | Server health check |

Authenticated API requests use a bearer token:

```http
Authorization: Bearer <jwt-token>
```

## Production Build

Build the React client:

```bash
npm run build --prefix client
```

Start the API in production:

```bash
npm start
```

For Vercel deployment, configure the backend environment variables in the hosting provider. The current `vercel.json` routes `/api/*` requests to the configured Render API deployment and serves the React build for other paths. Update that API destination when deploying your own backend.

## Notes

- The API defaults to port `5000` when `PORT` is not set.
- The client uses `/api` by default. Set `REACT_APP_API_URL` in the client environment when the API is hosted separately from the frontend.
- CORS permits `CLIENT_URL`, `http://localhost:3000`, and the deployed service marketplace URL configured in `server.js`.
