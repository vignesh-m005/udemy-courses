
import './App.css';
import AddExpense from './components/AddExpense';
import ListExpenses from './components/ListExpenses';
import ExpenseContextProvider from './store/ExpenseContext';

function App() {
  return (
    <div className="App">
      <ExpenseContextProvider>
          <AddExpense />
          <br/>
          <ListExpenses />
      </ExpenseContextProvider>
    </div>
  );
}

export default App;
