import "./App.css";
import { useA } from "../../api/reactive/v1/reactive_rbt_react";

function App() {
  const { useGetAState } = useA({ id: "A" });
  const { response } = useGetAState();

  if (response === undefined) return <>Loading...</>;

  const { combinedResponse } = response;
  return (
    <div className="App">
      <header className="App-header" style={{ fontSize: "200px" }}>
        {combinedResponse}
      </header>
    </div>
  );
}

export default App;
