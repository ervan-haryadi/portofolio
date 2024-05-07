import React, { createContext, useReducer } from 'react';

// 
export const AppReducer = (state, action) => {
    let new_expenses = [];
    switch (action.type) {
        case 'ADD_QUANTITY':
            let updatedqty = false;
            state.expenses.map((expense) => {
                if (expense.name === action.payload.name) {
                    expense.quantity += action.payload.quantity;
                    updatedqty = true;
                }
                new_expenses.push(expense);
                return true;
            })
            state.expenses = new_expenses;
            action.type='DONE';
            return {
                ...state,
            }
        case 'RED_QUANTITY':
            state.expenses.map((expense) => {
                if(expense.name === action.payload.name) {
                    expense.quantity -= action.payload.quantity;
                }
                expense.quantity = expense.quantity < 0 ? 0 : expense.quantity;
                new_expenses.push(expense);
                return true;
            })
            state.expenses = new_expenses;
            action.type='DONE';
            return {
                ...state,
            }
        case 'DELETE_ITEM':
            state.expenses.map((expense) => {
                if(expense.name === action.payload.name) {
                    expense.quantity = 0;
                }
                new_expenses.push(expense);
                return true;
            })
            state.expenses = new_expenses;
            action.type='DONE';
            return {
                ...state,
            }
        case 'CHG_LOCATION':
            action.type = 'DONE';
            state.location = action.payload;
            return {
                ...state,
            }
        default:
            return state;
    }
};

// 1. Initialize default state when app loads
const initialState = {
    expenses : [
        {id:'Shirt', name:'Shirt', quantity:0, unitprice:500},
        {id:'Jeans', name:'Jeans', quantity:0, unitprice:300},
        {id:'Dress', name:'Dress', quantity:0, unitprice:400},
        {id:'Dinner Set', name:'Dinner Set', quantity:0, unitprice:600},
        {id:'Bags', name:'Bags', quantity:0, unitprice:200},
    ],
    Location:'gbp'
};

// 2. Create AppContext that will be used by Components to get state
export const AppContext = createContext();

// 3. Provider Component - wraps components that will have access to the state
// ??? Accepts children which are nested components
export const AppProvider = (props) => {
    // Set up the app state with a reducer and initial state
    const [state, dispatch] = useReducer(AppReducer, initialState)

    const totalExpenses = state.expenses.reduce((total, item) => {
        return (total = total + (item.quantity * item.unitprice));
    }, 0);
    
    state.CartValue = totalExpenses;

    return (
        <AppContext.Provider
            value={{
                expenses: state.expenses,
                CartValue: state.CartValue,
                dispatch,
                Location: state.location
            }}
        >{props.children}
        </AppContext.Provider>
    )
}