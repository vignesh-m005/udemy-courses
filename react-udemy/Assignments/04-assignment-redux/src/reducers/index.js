// import { INITIAL_EXPENSES } from "../actions";
import { ADD_EXPENSE, DELETE_EXPENSE, UPDATE_EXPENSE } from "../actions/types";

// const INITIAL_EXPENSES = JSON.parse(localStorage.getItem("expenses"));

export default function expenseReducer(state = [], action) {
  switch (action.type) {
    case ADD_EXPENSE:
      return action.expense;
    case DELETE_EXPENSE:
      return state.filter((expense) => expense.id !== action.id);
    case UPDATE_EXPENSE:
      return action.expenses;
    default:
      return state;
  }
}
