import { intl } from "./lib/intl";

function App() {
  return (
    <>
      <span>
        testing this {intl.get("nested.nested-placeholders", { amount: 123 })}
      </span>
    </>
  );
}

export default App;
