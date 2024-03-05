import ExpenseItem from "./ExpenseItem";
import "./ExpensesList.css";

const ExpensesList = (props) => {

  if (props.items.length === 0) {
    return <h2 className="expenses-list__fallback">Found no expenses</h2>;
  }
  return props.items.map((expense) => {
    return (
      <ExpenseItem
        key={expense.id}
        expense={expense}
        deleteExpenses={props.onDelete}
        updateExpence={props.onUpdate}
      />
    );
  });
};

export default ExpensesList;
