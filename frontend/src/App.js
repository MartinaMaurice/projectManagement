// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RegisterForm from './components/RegisterForm';
import LoginForm from './components/LoginForm';
import './App.css';
import Dashboard from './components/Dashboard';
import Exams from './components/Exams';
import AddCourse from './components/AddCourse';
import SuccessfulTrainees from './components/SuccessfulTrainees';
import CalendarPage from './components/Calendar';
import Approval from './components/Approval';

function App() {
  return (
    <Router>  
      <div className="App" style={{ background: '#000', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Routes>
          <Route path="/SucceededTrainees" element={<SuccessfulTrainees />} />
          <Route path="/calendar" element={<CalendarPage />} />
          <Route path="/approval" element={<Approval />} />
          <Route path="/add-course" element={<AddCourse />} />
          <Route path="/exam-sessions" element={<Exams />} />
          <Route path="/home" element={<Dashboard />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/" element={<LoginForm />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

