import { ADD_EXPENSE, DELETE_EXPENSE, UPDATE_EXPENSE } from "./types";

export function addExpense(expense) {
  return { type: ADD_EXPENSE, expense: expense };
}

export function deleteExpense(id) {
  return { type: DELETE_EXPENSE, id: id };
}

export function updateExpense(expenses) {
  return { type: UPDATE_EXPENSE, expenses: expenses };
}

export const INITIAL_EXPENSES = [
  {
    id: "e1",
    title: "Car Insurance",
    amount: 234,
    date: new Date(2019, 2, 28),
  },
  {
    id: "e2",
    title: "New Desk",
    amount: 289,
    date: new Date(2020, 3, 15),
  },
  {
    id: "e3",
    title: "Laptop",
    amount: 256,
    date: new Date(2021, 6, 5),
  },
  {
    id: "e4",
    title: "Mouse",
    amount: 10,
    date: new Date(2021, 7, 18),
  },
];
