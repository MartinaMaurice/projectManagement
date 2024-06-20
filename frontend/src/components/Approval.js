import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Approval.css';

const Approval = () => {
    const [exams, setExams] = useState([]);
    const [userRole, setUserRole] = useState(''); // Add state for user role

    useEffect(() => {
        const fetchExamsToBeApproved = async () => {
            try {
                const response = await fetch('http://localhost:5000/examsAdmin/notApproved');
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const data = await response.json();
                setExams(data || []);
            } catch (error) {
                console.error('Error fetching exams to be approved:', error);
            }
        };

        const fetchUserRole = async () => {
            // Assuming there's an endpoint to get the current user's role
            try {
                const response = await fetch('http://localhost:5000/examsAdmin/user-role', {
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

        fetchUserRole();
        fetchExamsToBeApproved();
    }, []);

    const handleApprove = async (id) => {
        try {
            const response = await fetch(`http://localhost:5000/examsAdmin/${id}/approve`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ approved: true }),
            });
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            // Refresh the list after approval
            setExams(exams.filter((exam) => exam._id !== id));
        } catch (error) {
            console.error('Error approving exam:', error);
        }
    };

    const handleCancel = async (id) => {
        try {
            const response = await fetch(`http://localhost:5000/examsAdmin/${id}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            // Refresh the list after deletion
            setExams(exams.filter((exam) => exam._id !== id));
        } catch (error) {
            console.error('Error deleting exam:', error);
        }
    };

    return (
        <div className="approval-page">
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
            <h2>Admin Approval/Denial Table</h2>
            <div className="exam-list">
                {exams.length === 0 ? (
                    <p>All exams have been approved</p>
                ) : (
                    exams.map((exam) => (
                        <div key={exam._id} className="exam-item">
                            <div className="exam-details">
                                <span className="exam-title">{exam.title}</span>
                                <span className="exam-description">{exam.description}</span>
                                <span className="exam-description">{exam.location} | {exam.time}</span>
                            </div>
                            <div className="button-group">
                                <button className="cancel-button" onClick={() => handleCancel(exam._id)}>Cancel</button>
                                <button className="approve-button" onClick={() => handleApprove(exam._id)}>Approve</button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default Approval;
