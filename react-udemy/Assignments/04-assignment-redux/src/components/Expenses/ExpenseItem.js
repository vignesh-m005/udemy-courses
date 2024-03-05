import { useState } from "react";
import Card from "../UI/Card";
import ExpenseDate from "./ExpenseDate";
import "./ExpenseItem.css";
import UpdateExpense from "../NewExpense/UpdateExpense";

const ExpenseItem = ({ deleteExpenses, expense, updateExpence }) => {
  const [isUpdating, setIsUpdating] = useState(false);

  function handleUpdate() {
    setIsUpdating(true);
  }
  function onUpdate(updatedExpense) {
    setIsUpdating(false);
    updateExpence(updatedExpense);
  }
  return (
    <>
      <Card className="expense-item">
        <ExpenseDate date={expense.date}></ExpenseDate>
        <div className="expense-item__description">
          <h2>{expense.title}</h2>
          <div className="expense-item__price">${expense.amount}</div>
        </div>{" "}
        &emsp;
        <button onClick={() => handleUpdate()}>Edit</button> &emsp;
        <button onClick={() => deleteExpenses(expense)}>X</button> <br />
      </Card>
      {isUpdating && <UpdateExpense expense={expense} onUpdate={onUpdate} />}
    </>
  );
};

export default ExpenseItem;
