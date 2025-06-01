# EV Charging Station Application (Full Stack Assignment)

A full-stack application to manage EV charging stations using **Node.js**, **Express**, **MongoDB**, and **Vue.js**. Includes user authentication, CRUD operations, filtering, and map integration using Google Maps. Built as an assignment for a Full Stack Development internship application.

## 📦 Project Structure
```bash
├── backend/ # Express.js backend (REST API + JWT auth)
├── frontend/ # Vue.js frontend (UI + Map integration)
└── README.md # You're here
```

## 🚀 Deployed Links

- Backend hosted on render - https://ev-backend-dewj.onrender.com/api
- Frontend hosted on vercel - https://et-app-omega.vercel.app/
- Postman collection for backend apis - [Postman Collection Json](https://github.com/namanchandok/et_app/blob/main/backend/et_app.postman_collection.json)

## 📂 Backend Setup

```bash
cd backend
npm install
```

Create a .env file:

```bash
# MongoDB Configuration
MONGODB_URI=your_mongodb_atlas_connection_string

# JWT Configuration
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=7d

# Server Configuration
PORT=5000
```

Run the server:

```bash
npm run dev
```

The API will be available at: http://localhost:5000/api

## 📂 Frontend Setup

```bash
cd frontend
npm install
```

Create a .env file:

```bash
VITE_API_BASE_URL=http://localhost:5000/api
```

Run the development server:

```bash
npm run dev
```

The frontend will be available at: http://localhost:5173

### Routes

- `/` - Login page
- `/register` - Register page
- `/chargers` - List of all charging stations
- `/create` - Create a new charging station
- `/update/:id` - Edit an existing charging station
- `/profile` - User profile

## 📮 API Endpoints

### Auth

```bash
POST    /api/auth/register
POST    /api/auth/login
GET     /api/auth/profile
```

### Charging Stations

```bash
GET     /api/stations              # Get all stations
GET     /api/stations/:id          # Get single station
POST    /api/stations/create       # Create station (protected)
PUT     /api/stations/:id          # Update station (protected)
DELETE  /api/stations/:id          # Delete station (protected)
```

## 🧑‍💻 Author

**Naman Chandok**

📫 ([LinkedIn](https://www.linkedin.com/in/namanchandok/)) • ([GitHub](https://github.com/namanchandok))
