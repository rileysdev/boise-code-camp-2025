// frontend/src/App.tsx
import { useEffect, useState } from "react";
import { User } from "api"; // <<< Use the shared type
import "./App.css"; // Keep default styling

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        // Fetch user with ID 1 from the backend
        const response = await fetch("http://localhost:3001/api/user/1");

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const userData: User = await response.json(); // <<< Type the received data
        setUser(userData);
      } catch (err) {
        setError("Failed to fetch user");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []); // Empty dependency array means this runs once on mount

  if (loading) {
    return <div>Loading user...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Shared Types Example</h1>
        {user ? (
          <div>
            <h2>User Info:</h2>
            {/* Accessing properties, type-checked by TypeScript */}
            <p>ID: {user.id}</p>
            <p>Name: {user.name}</p>
            <p>Email: {user.email}</p>
          </div>
        ) : (
          <p>No user data available.</p>
        )}
      </header>
    </div>
  );
}

export default App;
