import React from 'react';
import { AppBar} from '@mui/material';
import TemporaryDrawer from './components/Sivupalkki';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Customers from './components/Customers';
import Trainings from './components/Trainings';
import Calendar from './components/Calendar';
import SportsVolleyballIcon from '@mui/icons-material/SportsVolleyball';
import './App.css'

function App() {

   const isCustomersRoute = () => {
    return navigate.location.pathname === '/customers';
  };
  return (
    <Router>
      <>
      <div className="custom-appbar">
        <AppBar position="static"  style={{ backgroundColor: '#1c1c1c' }} >
         
          
              <div className='header'>
              <TemporaryDrawer />
            
               <h2 className="gradient-text">Personal trainer</h2>
             
               <SportsVolleyballIcon style={{color:'#ffffff', background: 'transparent', border: 'none', cursor: 'pointer'}}fontSize='large'/>
              
              </div>
            
            
          
        </AppBar>
        </div>
        <Routes>
          <Route path="customers" element={<Customers />} />
          <Route path="trainings" element={<Trainings />} />
          <Route path="calendar" element={<Calendar />} />
          <Route path="/" element={<Navigate to="/customers" />} />
        </Routes>
         
      </>
    
    </Router>
  );
}

export default App;
