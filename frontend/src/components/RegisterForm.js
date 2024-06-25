import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './RegisterForm.css'; // Import the CSS for styling

const RegisterForm = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        age: '',
        role: 'trainee',
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleRoleChange = (role) => {
        setFormData({
            ...formData,
            role: role,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/users/register', {
                name: `${formData.firstName} ${formData.lastName}`,
                email: formData.email,
                password: formData.password,
                role: formData.role
            });
            console.log('User registered:', response.data);
            navigate('/login'); // Redirect to the login page
        } catch (error) {
            console.error('Error registering user:', error);
        }
    };

    return (
        <div className="register-container">
            <h2>Create account</h2>
            <p>Already have an account? <a href="/login">Login</a></p>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <input
                        type="text"
                        name="firstName"
                        placeholder="First Name"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="text"
                        name="lastName"
                        placeholder="Last Name"
                        value={formData.lastName}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </div>
                {/* <div className="form-group">
                    <input
                        type="number"
                        name="age"
                        placeholder="Age"
                        value={formData.age}
                        onChange={handleChange}
                        required
                    />
                </div> */}
                <div className="role-options">
                    <div
                        className={`role-option1 ${formData.role === 'trainee' ? 'active' : ''}`}
                        onClick={() => handleRoleChange('trainee')}
                    >
                        <input
                            type="radio"
                            name="role"
                            value="trainee"
                            checked={formData.role === 'trainee'}
                            onChange={handleChange}
                        />
                        Trainee
                    </div>
                    <div
                        className={`role-option2 ${formData.role === 'trainingCenter' ? 'active' : ''}`}
                        onClick={() => handleRoleChange('trainingCenter')}
                    >
                        <input
                            type="radio"
                            name="role"
                            value="trainingCenter"
                            checked={formData.role === 'trainingCenter'}
                            onChange={handleChange}
                        />
                        Training Center
                    </div>
                </div>
                <button type="submit">Create Account</button>
            </form>
        </div>
    );
};

export default RegisterForm;
