import { useUser } from "./api/user/v1/user_rbt_react";
// import UpdateUser from "./UpdateUser";
import "./App.css";

const STARTER_USER_ID = "reboot-user";

function App() {
  const { useGet } = useUser({ id: STARTER_USER_ID });

  const { response } = useGet();

  if (response === undefined) return <>Loading...</>;

  const { userId, name, email } = response;

  return (
    <div className="App">
      <header className="App-header">
        <h1>Reboot - Protobuf Example</h1>
        <div>
          <h2>User Info:</h2>
          <p>ID: {userId}</p>
          <p>Name: {name}</p>
          <p>Email: {email}</p>
        </div>
        {/* <UpdateUser /> */}
      </header>
    </div>
  );
}

export default App;
