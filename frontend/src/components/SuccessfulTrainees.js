import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './SuccessfulTrainees.css';

const SuccessfulTrainees = () => {
    const [trainees, setTrainees] = useState([]);

    useEffect(() => {
        const fetchSuccessfulTrainees = async () => {
            try {
                const response = await fetch('http://localhost:5000/users/successful');
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const data = await response.json();
                setTrainees(data || []);
            } catch (error) {
                console.error('Error fetching successful trainees:', error);
            }
        };

        fetchSuccessfulTrainees();
    }, []);

    return (
        <div className="successful-trainees-page">
            <nav className="navbar">
                <Link to="/home" className="nav-logo">Home Page</Link>
                <div className="nav-links">
                    <Link to="/calendar">Calendar</Link>
                    <Link to="/exam-sessions">Exam Sessions</Link>
                    <Link to="/succeeded-trainees">Succeeded Trainee</Link>
                </div>
            </nav>
            <div className="trainees-list">
                {trainees.map((trainee) => (
                    <div key={trainee._id} className="trainee-item">
                        <div className="trainee-name">{trainee.name}</div>
                        <div className="trainee-exams">
                            {trainee.exams.map((exam, index) => (
                                <div key={index} className="exam-detail">
                                    Which Exam He/She Succeeded in: {exam.title}
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SuccessfulTrainees;
