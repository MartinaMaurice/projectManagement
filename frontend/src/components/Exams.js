import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Exams.css';

const Exams = () => {
    const [exams, setExams] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [userRole, setUserRole] = useState(''); // Assume we have a method to get the user role
    const navigate = useNavigate();

    useEffect(() => {
        const fetchExams = async () => {
            try {
                const response = await fetch('http://localhost:5000/exams');
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const data = await response.json();
                setExams(data || []); // Ensure data is not undefined
            } catch (error) {
                console.error('Error fetching exams:', error);
                setExams([]); // Set exams to an empty array in case of an error
            }
        };

        const fetchUserRole = async () => {
            // Assuming there's an endpoint to get the current user's role
            try {
                const response = await fetch('http://localhost:5000/exams/user-role', {
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

        fetchExams();
        fetchUserRole();
    }, []); // Empty dependency array ensures useEffect runs only once

    const filteredExams = exams.filter(exam =>
        exam.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="dashboard">
            <nav className="navbar">
                <Link to="/home" className="nav-logo">
                    Home Page
                </Link>
                <div className="nav-links">
                    <Link to="/calendar">Calendar</Link>
                    <Link to="/exam-sessions">Exam Sessions</Link>
                    <Link to="/profile">Profile</Link>
                </div>
            </nav>

            <h2>Exams</h2>
            <div className="search-and-add">
                <input
                    type="text"
                    placeholder="Search Here..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="search-bar"
                />
                {userRole === 'trainingCenter' && (
                    <button className="add-course-button" onClick={() => navigate('/add-course')}>
                        Add New Exam
                    </button>
                )}
            </div>
            <div className="exam-grid">
                {filteredExams.map((exam) => (
                    <div key={exam._id} className="exam-card">
                        <h3>{exam.title}</h3>
                        <p>{exam.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Exams;
