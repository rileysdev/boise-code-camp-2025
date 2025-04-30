// backend/src/index.ts
import express from "express";
import cors from "cors";
import { User } from "api"; // <<< Use the shared type

const app = express();
const port = 3001; // Choose a port

app.use(cors()); // Enable CORS for all origins (for this simple example)
app.use(express.json());

// Simple in-memory data conforming to the User type
const sampleUser: User = {
  id: 1,
  name: "Alice Wonderland",
  email: "alice@example.com",
};

// Endpoint that returns a user
app.get("/api/user/:id", (req, res) => {
  const userId = parseInt(req.params.id, 10);

  if (userId === sampleUser.id) {
    // The sampleUser object is type-checked against the User interface
    res.json(sampleUser);
  } else {
    res.status(404).json({ message: "User not found" });
  }
});

app.listen(port, () => {
  console.log(`Backend listening at http://localhost:${port}`);
});
