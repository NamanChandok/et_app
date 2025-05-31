# EV Charging Station Application (Full Stack Assignment)

A full-stack application to manage EV charging stations using **Node.js**, **Express**, **MongoDB**, and **Vue.js**. Includes user authentication, CRUD operations, filtering, and map integration using Google Maps. Built as an assignment for a Full Stack Development internship application.

## 📦 Project Structure
```bash
├── backend/ # Express.js backend (REST API + JWT auth)
├── frontend/ # Vue.js frontend (UI + Map integration)
└── README.md # You're here
```

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

# CORS Configuration
CLIENT_URL=http://localhost:5173
```

Run the server:

```bash
npm run dev
```

## 📮 API Endpoints

### Auth

```bash
Copy
Edit
POST    /api/auth/register
POST    /api/auth/login
GET    /api/auth/profile
```

### Charging Stations

```bash
Copy
Edit
GET     /api/stations
POST    /api/stations/create         (protected)
PUT     /api/stations/update/:id     (protected)
DELETE  /api/stations/delete/:id     (protected)
```

## 🧑‍💻 Author

**Naman Chandok**

📫 ([LinkedIn](https://www.linkedin.com/in/namanchandok/)) • ([GitHub](https://github.com/namanchandok))
