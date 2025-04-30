// frontend/src/App.tsx
import { use } from "react";
import { useUser } from "./api/user/v1/user_rbt_react"; // Import the shared type
import "./App.css"; // Keep default styling

const STARTER_USER_ID = "reboot-user";

function App() {
  const { useGet } = useUser({ id: STARTER_USER_ID });

  const { response } = useGet();

  const { id, name, email } = response;

  return (
    <div className="App">
      <header className="App-header">
        <h1>Shared Types Example</h1>
        {response ? (
          <div>
            <h2>User Info:</h2>
            <p>ID: {id}</p>
            <p>Name: {name}</p>
            <p>Email: {email}</p>
          </div>
        ) : (
          <p>No user data available.</p>
        )}
      </header>
    </div>
  );
}

export default App;
