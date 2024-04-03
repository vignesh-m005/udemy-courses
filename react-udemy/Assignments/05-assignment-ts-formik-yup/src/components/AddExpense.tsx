import { Field, Form, Formik, useFormik } from "formik"
import { useContext } from "react"
import * as yup from "yup"
import { ExpenseContext } from "../store/ExpenseContext"
import { Expense } from "../model/Expense"

const AddExpense: React.FC = () => {

    const expenseContext = useContext(ExpenseContext);

    const formik = useFormik({
        initialValues:{
            title: "", 
            description: "", 
            amount: 0},
        onSubmit: values => handleSubmit(values)
        });

    function handleSubmit(values: {title: string, description: string, amount: number}){
        const newExpense: Expense = {
            id: Math.random(),
            title: values.title,
            description: values.description,
            amount: values.amount
        }
        console.log(newExpense)
        expenseContext.addExpense(newExpense)
    }

    return (
        
            <Form onSubmit={formik.handleSubmit}>
                <label>Title</label> <br/>
                <Field name="title" type="text" onChange={formik.handleChange} value={formik.values.title} /> <br/>
                <label>Description</label> <br/>
                <Field name="description" type="text" onChange={formik.handleChange} value={formik.values.description} /> <br/>
                <label>Amount</label> <br/>
                <Field name="amount" type="number" onChange={formik.handleChange} value={formik.values.amount} /> <br /> <br/>
                <button type="submit">Add</button>
            </Form>
      
        
    )
}

export default AddExpense;