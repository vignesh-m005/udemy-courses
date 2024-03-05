import "./App.css";
import Expenses from "./components/Expenses/Expenses";
//import React from "react";
import { Provider } from "react-redux";
import { createStore } from "redux";
import expenseReducer from "./reducers";
import { addExpensesInDB } from "./http";
import { INITIAL_EXPENSES } from "./actions";
import { useEffect } from "react";
// addExpensesInDB(INITIAL_EXPENSES);
const App = () => {
  const store = createStore(expenseReducer);

  return (
    <Provider store={store}>
      <div className="App">
        <h1>Expenses example with Redux</h1>
        <Expenses />
      </div>
    </Provider>
  );
};

export default App;
