import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AddCourse.css';

const AddCourse = () => {
    const [newCourse, setNewCourse] = useState({ title: '', description: '', date: '', time: '', location: '' });
    const navigate = useNavigate();

    const handleAddCourse = async () => {
        console.log('Submitting new course:', newCourse); // Debugging log
        try {
            const response = await fetch('http://localhost:5000/examsAdmin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newCourse),
            });
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const result = await response.json();
            console.log(result); // Log the response from the server

            if (window.confirm('Waiting for admin to approve. Click OK to go to exam sessions.')) {
                navigate('/exam-sessions');
            }
        } catch (error) {
            console.error('Error adding course:', error);
        }
    };

    return (
        <div className="add-course-container">
            <h2>Adding New Exam</h2>
            <div className="form-container">
                <div className="form-group-left">
                    <input
                        type="text"
                        placeholder="Exam Name..."
                        value={newCourse.title}
                        onChange={(e) => setNewCourse({ ...newCourse, title: e.target.value })}
                    />
                    <input
                        type="text"
                        placeholder="Description..."
                        value={newCourse.description}
                        onChange={(e) => setNewCourse({ ...newCourse, description: e.target.value })}
                    />
                </div>
                <div className="form-group-right">
                    <select
                        value={newCourse.time}
                        onChange={(e) => setNewCourse({ ...newCourse, time: e.target.value })}
                    >
                        <option value="">Timing</option>
                        <option value="10 Am">10 Am</option>
                        <option value="12 Pm">12 Pm</option>
                        <option value="2 Pm">2 Pm</option>
                        <option value="4 Pm">4 Pm</option>
                        <option value="6 Pm">6 Pm</option>
                        <option value="8 Pm">8 Pm</option>
                    </select>
                    <select
                        value={newCourse.location}
                        onChange={(e) => setNewCourse({ ...newCourse, location: e.target.value })}
                    >
                        <option value="">Location</option>
                        <option value="Room 1">Room 1</option>
                        <option value="Room 2">Room 2</option>
                        <option value="Room 3">Room 3</option>
                        <option value="Room 4">Room 4</option>
                        <option value="Room 5">Room 5</option>
                        <option value="Room 6">Room 6</option>
                    </select>
                </div>
                <div className="form-group-bottom">
                    <input
                        type="date"
                        value={newCourse.date}
                        onChange={(e) => setNewCourse({ ...newCourse, date: e.target.value })}
                    />
                </div>
            </div>
            <div className="form-buttons">
                <button onClick={() => navigate('/exam-sessions')} className="cancel-button">Cancel</button>
                <button onClick={handleAddCourse} className="add-exam-button">Add Exam</button>
            </div>
        </div>
    );
};

export default AddCourse;
