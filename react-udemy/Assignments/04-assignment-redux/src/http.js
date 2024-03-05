export async function fetchExpenses() {
  const response = await fetch(
    "https://react-practice-f1ecf-default-rtdb.firebaseio.com/expenses.json"
  );
  if (!response.ok) {
    throw new Error("Failed to Fetch Expenses");
  }
  const data = await response.json();
  console.log(data);
  return data;
}

export async function addExpensesInDB(expenses) {
  const response = await fetch(
    "https://react-practice-f1ecf-default-rtdb.firebaseio.com/expenses.json",
    {
      method: "PUT",
      body: JSON.stringify(expenses),
      headers: {
        "content-type": "application/json",
      },
    }
  );
  if (!response.ok) {
    throw new Error("Failed to Fetch Expenses");
  }

  return "Added";
}

export async function deleteExpensesInDB(expenses) {
  const response = await fetch(
    "https://react-practice-f1ecf-default-rtdb.firebaseio.com/expenses.json",
    {
      method: "PUT",
      body: JSON.stringify(expenses),
      headers: {
        "content-type": "application/json",
      },
    }
  );
  if (!response.ok) {
    throw new Error("Failed to delete Expenses");
  }

  return "Added";
}
