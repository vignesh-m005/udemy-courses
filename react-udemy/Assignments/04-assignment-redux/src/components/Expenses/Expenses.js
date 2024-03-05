import "./Expenses.css";
import ExpensesList from "./ExpensesList";
import Card from "../UI/Card";
import { useCallback, useEffect, useState } from "react";
import NewExpense from "./../NewExpense/NewExpense";
import { useDispatch, useSelector } from "react-redux";
import { addExpense, deleteExpense, updateExpense } from "../../actions";
import { addExpensesInDB, deleteExpensesInDB, fetchExpenses } from "../../http";

const Expenses = (props) => {
  // const [expenses, setExpenses] = useState(INITIAL_EXPENSES);
  const expenses = useSelector((state) => state);
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    setInitialStateCall();
  }, []);

  const setInitialStateCall = useCallback(async function setInitialState() {
    setIsLoading(true);
    const expenses = await fetchExpenses();
    dispatch(addExpense(expenses));
    setIsLoading(false);
  }, []);

  const addExpenseHandler = async (expense) => {
    let prevExpenses = await fetchExpenses();
    let newExpenses = [...prevExpenses, expense];
    dispatch(addExpense(newExpenses));
    try {
      await addExpensesInDB(newExpenses);
    } catch (error) {
      dispatch(addExpense(prevExpenses));
    }
  };

  const deleteExpenses = async (expense) => {
    try {
      await deleteExpensesInDB(expenses.filter((exp) => exp.id !== expense.id));
      dispatch(deleteExpense(expense.id));
    } catch (error) {}
  };

  const updateExpence = async (expense) => {
    const updatedExpenses = expenses.map((exp) => {
      if (expense.id === exp.id) {
        return expense;
      } else {
        return exp;
      }
    });

    try {
      await addExpensesInDB(updatedExpenses);
      dispatch(updateExpense(updatedExpenses));
    } catch (error) {}
  };

  return (
    <>
      <NewExpense onAddExpense={addExpenseHandler} />
      <Card className="expenses">
        {isLoading ? (
          <h2 className="expenses-list__fallback">Fetching Expenses...</h2>
        ) : (
          <ExpensesList
            items={expenses}
            onDelete={deleteExpenses}
            onUpdate={updateExpence}
            isLoading={isLoading}
          />
        )}
      </Card>
    </>
  );
};

export default Expenses;
