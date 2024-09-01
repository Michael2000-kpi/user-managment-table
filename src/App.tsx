import React from "react";
import { Provider } from "react-redux";
import { Store } from "./Store";
import UserManagementTable from "./components/UserManagementTable";
import "./App.css";

function App() {
  return (
    <Provider store={Store}>
      <UserManagementTable />
    </Provider>
  );
}

export default App;
