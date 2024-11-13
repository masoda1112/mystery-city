import React, { useState } from 'react';
import { TextField, Button, Box, Typography, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { auth } from '../firebaseConfig';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from 'react-router-dom';

function SignUpForm() {
    const [formData, setFormData] = useState({
        userName: '',
        nationality: '',
        mail: '',
        password: ''
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };
    const handleSignUp = async (e) => {
        e.preventDefault();
        try {
            await createUserWithEmailAndPassword(auth, formData.mail, formData.password);
            
            navigate('/mysteries'); 
            
        } catch (error) {
            console.log(error.message)
            setError(error.message);
        }
    };

    return (
        <Box component="form" onSubmit={handleSignUp} sx={{ maxWidth: 400, mx: "auto", mt: 5 }}>
            <Typography variant="h5" gutterBottom>
                Let the journey begin!
            </Typography>
            <TextField
                label="User Name"
                variant="outlined"
                name="userName"
                fullWidth
                margin="normal"
                value={formData.userName}
                onChange={handleChange}
                required
            />
            <FormControl fullWidth margin="normal">
                {/* <InputLabel>Nationality</InputLabel> */}
                <Select
                    name="nationality"
                    value={formData.nationality}
                    onChange={handleChange}
                    displayEmpty
                    label="Nationality"
                    renderValue={(selected) => {
                        if (selected === "") {
                            return <em>Nationality</em>;
                        }
                        return selected;
                    }}
                    fullWidth
                >
                    <MenuItem value="">
                        <em>Nationality</em>
                    </MenuItem>
                    <MenuItem value="Japan">Japan</MenuItem>
                    <MenuItem value="USA">USA</MenuItem>
                    <MenuItem value="Canada">Canada</MenuItem>
                    <MenuItem value="Australia">Australia</MenuItem>
                    <MenuItem value="UK">UK</MenuItem>
                    {/* 他の国も追加可能 */}
                </Select>
            </FormControl>
            <TextField
                label="Email"
                variant="outlined"
                name="mail"
                type="email"
                fullWidth
                margin="normal"
                value={formData.mail}
                onChange={handleChange}
                required
            />
            <TextField
                label="Password"
                variant="outlined"
                name="password"
                type="password"
                fullWidth
                margin="normal"
                value={formData.password}
                onChange={handleChange}
                required
            />
            <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 3 }}>
                Sign Up
            </Button>
        </Box>
    );
}

export default SignUpForm;