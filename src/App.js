import React from 'react';
import './App.css';
import Reg1 from './Reg1';
import Reg2 from './Reg2';
import RegOtp from './RegOtp';
import Login from './Login';
import Forgotpd from './Forgotpd';
import Resetpd from './Resetpd';
import ResetPdChange from './ResetPdChange';
import Dashboard from './Dashboard';
import History from './History';
import Profile from './Profile';
import Store from './Store';
import History1 from './History1';
import History2 from './History2';
import History3 from './History3';
import TransactionChain1 from './TransactionChain1';
import TransactionChain2 from './TransactionChain2';
import TransactionChain3 from './TransactionChain3';
import {
  BrowserRouter as Router,
  Routes, 
  Route} from 'react-router-dom'
  import { UserProvider } from './UserContext';
import PaymentScreen from './Payment';
import PaymentConfirm from './PaymentConfirm';
import Payment2 from './Payment2';

function App() {
  return (
    <UserProvider>
    <Router>
      <Routes>
        <Route path='/' element={<Reg1/>}></Route>
        <Route path='/Reg2' element={<Reg2/>}></Route>
        <Route path='/RegOtp' element={<RegOtp/>}></Route>
        <Route path='/Login' element={<Login/>}></Route>
        <Route path='/Forgotpd' element={<Forgotpd/>}></Route>
        <Route path='/Resetpd' element={<Resetpd/>}></Route>
        <Route path='/ResetPdChange' element={<ResetPdChange/>}></Route>
        <Route path='/Dashboard' element={<Dashboard/>}></Route>
        <Route path='/History' element={<History/>}></Route>
        <Route path='/Profile' element={<Profile/>}></Route>
        <Route path='/Payment2' element={<Payment2/>}></Route>
        <Route path='/Store' element={<Store/>}></Route>
        <Route path='/Payment' element={<PaymentScreen/>}></Route>
        <Route path='/PaymentConfirm' element={<PaymentConfirm/>}></Route>
        <Route path='/History1' element={<History1/>}></Route>
        <Route path='/History2' element={<History2/>}></Route>
        <Route path='/History3' element={<History3/>}></Route>
        <Route path='/TransactionChain1' element={<TransactionChain1/>}></Route>
        <Route path='/TransactionChain2' element={<TransactionChain2/>}></Route>
        <Route path='/TransactionChain3' element={<TransactionChain3/>}></Route>
      </Routes>
    </Router>
    </UserProvider>
  );
}

export default App;
