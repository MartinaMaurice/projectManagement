import React, { useEffect, useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './Calendar.css';
import { useNavigate, Link } from 'react-router-dom';


const localizer = momentLocalizer(moment);

const CalendarPage = () => {
    const [events, setEvents] = useState([]);
    const [reservedExams, setReservedExams] = useState([]);
    const [userRole, setUserRole] = useState(''); // Assume we have a method to get the user role
    const navigate = useNavigate();

    useEffect(() => {
        const fetchExams = async () => {
            try {
                const response = await fetch('http://localhost:5000/examsAdmin/approved');
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const data = await response.json();
                const events = data.map(exam => ({
                    id: exam._id,
                    title: exam.title,
                    start: new Date(exam.date),
                    end: new Date(new Date(exam.date).setHours(new Date(exam.date).getHours() + 1)), // Assuming each exam lasts 1 hour
                    description: exam.description,
                    location: exam.location,
                    time: exam.time
                }));
                setEvents(events);
            } catch (error) {
                console.error('Error fetching exams:', error);
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
    }, []);

    const handleSelectEvent = async (event) => {
        if (isExamReserved(event.id)) {
            alert('This exam is already reserved.');
            return;
        }

        try {
            const userId = localStorage.getItem('userId'); // Assuming user ID is stored in localStorage
            const response = await fetch(`http://localhost:5000/users/${userId}/addExam`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`, // Assuming token is stored in localStorage
                },
                body: JSON.stringify({
                    id: event.id,
                    title: event.title,
                    date: event.start,
                    time: event.time,
                    description: event.description,
                    location: event.location
                }),
            });
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();
            console.log('Exam added to user:', data);
            alert('Exam added to your schedule!');
            setReservedExams([...reservedExams, { id: event.id }]); // Add event ID to reservedExams state
        } catch (error) {
            console.error('Error adding exam to user:', error);
        }
    };

    const isExamReserved = (examId) => {
        return reservedExams.some(reservedExam => reservedExam.id === examId);
    };

    const eventStyleGetter = (event) => {
        const style = {
            backgroundColor: isExamReserved(event.id) ? 'gray' : '#007bff',
            borderRadius: '5px',
            opacity: 0.8,
            color: 'white',
            border: '0px',
            display: 'block',
            cursor: isExamReserved(event.id) ? 'not-allowed' : 'pointer'
        };
        return {
            style: style
        };
    };

    return (
        <div className="calendar-page">
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
            <div className="calendar-container">
                <Calendar
                    localizer={localizer}
                    events={events}
                    startAccessor="start"
                    endAccessor="end"
                    style={{ flex: 1 }}
                    onSelectEvent={handleSelectEvent}
                    eventPropGetter={eventStyleGetter}
                />
            </div>
        </div>
    );
};

export default CalendarPage;
