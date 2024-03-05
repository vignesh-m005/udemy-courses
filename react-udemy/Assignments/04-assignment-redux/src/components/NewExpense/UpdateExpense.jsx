import ExpenseForm from "./ExpenseForm";
import "./NewExpense.css";

const UpdateExpense = (props) => {
  const saveExpenseHandler = (enteredExpenseData) => {
    console.log(enteredExpenseData);
    props.onUpdate(enteredExpenseData);
  };

  function onCancel() {
    props.onUpdate({});
  }

  return (
    <div className="new-expense">
      <ExpenseForm
        expense={props.expense}
        onSaveExpense={saveExpenseHandler}
        onCancel={onCancel}
        type={"Update"}
      />
    </div>
  );
};

export default UpdateExpense;
