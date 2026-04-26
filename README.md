# Project Overview

This project is a real-time leaderboard system that allows users to view and compete in various activities, showcasing their achievements in real-time.

---

## Project URL

https://roadmap.sh/projects/realtime-leaderboard-system

---

## Features

- 🏆 **Real-Time Updates**: See changes in leaderboard positions instantly.
- ⚙️ **User Authentication**: Secure login for all participants.
- 📊 **Leaderboard Filtering**: Filter by activity, date, and more.
- 💬 **Chat Functionality**: Interact with competitors in real-time.

---

## Tech Stack

| Technology     | Description                             |
|----------------|-----------------------------------------|
| Node.js        | Server-side JavaScript runtime          |
| Express.js     | Web framework for Node.js              |
| MongoDB        | NoSQL database for data storage        |
| WebSocket      | For real-time data exchange             |

---

## Prerequisites

- Node.js (v14+)
- MongoDB (local or cloud)

---

## Installation Steps

1. Clone the repository:
   ```bash
   git clone https://github.com/manash-codes/real-time-leaderboard.git
   cd real-time-leaderboard
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the application:
   ```bash
   npm start
   ```

---

## API Documentation

### Endpoints

- **GET /api/leaderboard**: Fetches the current leaderboard.
  - **Response**:
    ```json
    [
      {
        "userId": "123",
        "username": "player1",
        "score": 100
      }
    ]
    ```  
- **POST /api/score**: Updates the score of a user.
  - **Request**:
    ```json
    {
      "userId": "123",
      "score": 150
    }
    ```
  - **Response**:
    ```json
    { "success": true }
    ```

---

## WebSocket Implementation

The server utilizes WebSocket for real-time communication. Connect to the WebSocket server: 
```javascript
const socket = new WebSocket('ws://localhost:3000');
```

---

## Project Structure

```
├── src
│   ├── controllers
│   ├── models
│   ├── routes
│   └── services
├── tests
├── .env
└── package.json
```

---

## Database Schema

- **Users**: `{ userId, username, score }`
- **Scores**: `{ userId, score, activityId }`

---

## Security Features

- User authentication using JWT.
- Data validation and sanitization.

---

## Performance Optimizations

- Caching frequently accessed leaderboard data.
- Using WebSockets to reduce polling overhead.

---

## Troubleshooting Guide

- Ensure MongoDB is running.
- Check for dependency issues with `npm install`.

---

## Contributing Guidelines

1. Fork the repo.
2. Create a new branch (`git checkout -b feature/YourFeature`).
3. Make your changes and commit (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature/YourFeature`).
5. Open a pull request.

---

## Author Info

- Manash Gupta
- [GitHub Profile](https://github.com/manash-codes)

---

## MIT License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.