import React from 'react';
import { AppBar, Typography, Toolbar } from '@mui/material';
import TemporaryDrawer from './components/sivupalkki';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Customers from './components/Customers';
import Trainings from './components/Trainings';
import Calendar from './components/Calendar';

function App() {
  return (
    <Router>
      <>
        <AppBar position="static" color="primary">
          <Toolbar>
            <Typography variant="h6">
            Personal trainer
              <TemporaryDrawer />
            </Typography>
          </Toolbar>
        </AppBar>

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
