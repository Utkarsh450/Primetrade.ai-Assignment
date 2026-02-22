import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Dashboard from '../pages/Dashboard'
import Budgets from '../pages/Budgets'
import BudgetExpenses from '../pages/BudgetExpenses'
import Expenses from '../pages/Expenses'
import Register from '../pages/Register'
import Login from '../pages/Login'
import AuthWrapper from '../components/Authwrapper'

const MainRoutes: React.FC = () => {
  return (
    <Routes>
        <Route path="/" element={<AuthWrapper><Dashboard/></AuthWrapper>}/>
        <Route path="/budgets" element={<AuthWrapper><Budgets/></AuthWrapper>   }/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/budgets/:id" element={<AuthWrapper><BudgetExpenses/></AuthWrapper>}/>
        <Route path="/expenses" element={<AuthWrapper><Expenses/></AuthWrapper>}/>


    </Routes>
  )
}

export default MainRoutes