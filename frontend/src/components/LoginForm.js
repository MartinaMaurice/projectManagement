import React, { useState } from 'react';
import axios from 'axios';
import './LoginForm.css'; // Import the CSS for styling

const LoginForm = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/users/login', {
                email: formData.email,
                password: formData.password,
            });
            console.log('User logged in:', response.data);
        } catch (error) {
            console.error('Error logging in user:', error);
        }
    };

    return (
        <div className="login-container">
            <h2>Login</h2>
            <p>Don't have an account? <a href="/register">Register</a></p>
            <form onSubmit={handleSubmit}>
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
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default LoginForm;
