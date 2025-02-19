import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Exams.css';

const Exams = () => {
    const [exams, setExams] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [userRole, setUserRole] = useState(''); // Assume we have a method to get the user role
    const [reservedExams, setReservedExams] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchExams = async () => {
            try {
                const response = await fetch('http://localhost:5000/examsAdmin/approved'); // Ensure the correct URL
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const data = await response.json();
                setExams(Array.isArray(data) ? data : []); // Ensure data is an array
            } catch (error) {
                console.error('Error fetching exams:', error);
                setExams([]); // Set exams to an empty array in case of an error
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

        const fetchReservedExams = async () => {
            try {
                const userId = localStorage.getItem('userId'); // Assuming user ID is stored in localStorage
                if (!userId) throw new Error('User ID is not available');

                const response = await fetch(`http://localhost:5000/users/${userId}/reservedExams`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                });
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const data = await response.json();
                setReservedExams(data || []); // Ensure data is not undefined
            } catch (error) {
                console.error('Error fetching reserved exams:', error);
            }
        };

        fetchExams();
        fetchUserRole();
        fetchReservedExams();
    }, []); // Empty dependency array ensures useEffect runs only once

    const handleReserve = async (exam) => {
        try {
            const userId = localStorage.getItem('userId'); // Assuming user ID is stored in localStorage
            if (!userId) throw new Error('User ID is not available');

            const response = await fetch(`http://localhost:5000/users/${userId}/addExam`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`, // Assuming token is stored in localStorage
                },
                body: JSON.stringify({
                    id: exam._id,
                    title: exam.title,
                    date: exam.date,
                    time: exam.time,
                    description: exam.description,
                    location: exam.location
                }),
            });
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();
            console.log('Exam added to user:', data);
            alert('Exam reserved!');
            setReservedExams([...reservedExams, { _id: exam._id }]); // Add exam to reservedExams state
        } catch (error) {
            console.error('Error reserving exam:', error);
        }
    };

    const filteredExams = exams.filter(exam =>
        exam.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const isExamReserved = (examId) => {
        return reservedExams.some(reservedExam => reservedExam._id === examId);
    };

    return (
        <div className="dashboard">
            <nav className="navbar">
                <Link to="/home" className="nav-logo">
                    Home Page
                </Link>
                <div className="nav-links">
                    <Link to="/calendar">Calendar</Link>
                    <Link to="/exam-sessions">Exam Sessions</Link>
                    {userRole === 'admin' && (
                        <Link to="/approval">Exams to be approved</Link>
                    )}
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
                        {userRole === 'trainee' && (
                            <button
                                className={`reserve-button ${isExamReserved(exam._id) ? 'reserved' : ''}`}
                                onClick={() => handleReserve(exam)}
                                disabled={isExamReserved(exam._id)}
                            >
                                {isExamReserved(exam._id) ? 'Reserved' : 'Reserve'}
                            </button>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Exams;
