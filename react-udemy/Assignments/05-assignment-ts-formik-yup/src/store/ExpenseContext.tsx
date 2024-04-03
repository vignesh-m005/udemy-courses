import React, {  createContext, useState } from "react";
import { Expense } from "../model/Expense";

export const ExpenseContext = createContext<{expenses: Expense[], addExpense: (expense: Expense) => void,removeExpense: (id: number) =>void  }>({
    expenses: [],
    addExpense: () => {},
    removeExpense: () => {}
})

const ExpenseContextProvider: React.FC <{children: React.ReactNode}> = ({children}) =>{
    const initialExpenses: Expense[] = [{
        id: 1,
        title: "Mobile",
        description: "Oneplus nord CE 2",
        amount: 24000
    },
    {
        id: 1,
        title: "Laptop",
        description: "Dell Lattitude 3420",
        amount: 80000
    }]

    const [expenses, setExpenses] = useState(initialExpenses);

    function addExpense(expense: Expense){
        setExpenses((prev) => prev.concat(expense))
    }

    function removeExpense(id: number){
        setExpenses((prev) => prev.filter((expense) => expense.id !== id))
    }

    const expenseContext = {
        expenses, 
        addExpense,
        removeExpense
    }

    return (
        <ExpenseContext.Provider value={expenseContext}> {children}</ExpenseContext.Provider>
    )
}

export default ExpenseContextProvider;