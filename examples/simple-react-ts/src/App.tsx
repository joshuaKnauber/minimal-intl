import { intl } from "./lib/intl";

function App() {
  return (
    <>
      <span>testing this {intl.get("other", { test: 123 })}</span>
    </>
  );
}

export default App;
