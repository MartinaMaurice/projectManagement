import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Dashboard.css';
import PieChart from './PieChart';

const Dashboard = () => {
    const [notifications, setNotifications] = useState([]);
    const [userRole, setUserRole] = useState(''); // Add state for user role
    const [metrics, setMetrics] = useState({
        totalExamSessions: 0,
        availableSlots: 0,
        numberOfTrainingCenters: 0,
        upcomingExams: 0,
    });

    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                const response = await fetch('http://localhost:5000/notifications');
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const data = await response.json();
                const sortedNotifications = data.notifications.sort((a, b) => new Date(b.time) - new Date(a.time));
                setNotifications(sortedNotifications);
            } catch (error) {
                console.error('Error fetching notifications:', error);
            }
        };

        const fetchMetrics = async () => {
            try {
                const response = await fetch('http://localhost:5000/metrics');
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const data = await response.json();
                setMetrics(data);
            } catch (error) {
                console.error('Error fetching metrics:', error);
            }
        };
        const fetchUserRole = async () => {
            // Assuming there's an endpoint to get the current user's role
            try {
                const response = await fetch('http://localhost:5000/examsAdmin/user-role', { // Ensure the correct URL
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                });
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const data = await response.json();
                let role = localStorage.getItem('userRole');
                console.log(localStorage.getItem('userRole'));
                setUserRole(role);
            } catch (error) {
                console.error('Error fetching user role:', error);
                setUserRole(''); // Set userRole to an empty string in case of an error
            }
        };

        fetchNotifications();
        fetchMetrics();
        fetchUserRole();
    }, []); // Empty dependency array ensures useEffect runs only once

    return (
        <div className="dashboard">
            <nav className="navbar">
                <Link to="/home" className="nav-logo">
                    Home Page
                </Link>
                <div className="nav-links">
                    <Link to="/calendar">Calendar</Link>
                    <Link to="/exam-sessions">Exam Sessions</Link>
                    {/* <Link to="/profile">Profile</Link> */}
                    {userRole === 'admin' && (
                        <Link to="/approval">Exams to be approved</Link>
                    )}
                </div>
            </nav>
            <div className="main-content">
                <div className="metrics">
                    <h2>Metrics</h2>
                    <div className="metrics-grid">
                        <div className="metric-card">
                            <div style={{ width: '100px', height: '100px' }}>
                                <PieChart value={metrics.totalExamSessions > 100 ? 100 : metrics.totalExamSessions} />
                            </div>
                            <h3>Total Exam Sessions</h3>
                            <p>{metrics.totalExamSessions}</p>
                        </div>
                        <div className="metric-card">
                            <div style={{ width: '100px', height: '100px' }}>
                                <PieChart value={metrics.availableSlots > 100 ? 100 : metrics.availableSlots} />
                            </div>
                            <h3>Available Slots</h3>
                            <p>{metrics.availableSlots}</p>
                        </div>
                        <div className="metric-card">
                            <div style={{ width: '100px', height: '100px' }}>
                                <PieChart value={metrics.numberOfTrainingCenters > 100 ? 100 : metrics.numberOfTrainingCenters} />
                            </div>
                            <h3>Number of Training Centers</h3>
                            <p>{metrics.numberOfTrainingCenters}</p>
                        </div>
                        <div className="metric-card">
                            <div style={{ width: '100px', height: '100px' }}>
                                <PieChart value={metrics.upcomingExams > 100 ? 100 : metrics.upcomingExams} />
                            </div>
                            <h3>Upcoming Exams</h3>
                            <p>{metrics.upcomingExams}</p>
                        </div>
                    </div>
                </div>
                <div className="notifications">
                    <h2>Important Alerts</h2>
                    {notifications.map((notification, index) => (
                        <div key={index} className="notification-card">
                            <h3>{notification.title}</h3>
                            <p>{notification.message}</p>
                            <span>{notification.time}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
