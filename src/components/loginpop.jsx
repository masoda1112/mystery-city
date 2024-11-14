import React, { useState } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';
import { auth } from '../firebaseConfig';
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from 'react-router-dom';

function LoginForm() {
    const [formData, setFormData] = useState({
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

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            await signInWithEmailAndPassword(auth, formData.mail, formData.password);
            navigate('/mysteries'); 
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <Box component="form" onSubmit={handleLogin} sx={{ maxWidth: 400, mx: "auto", mt: 5 }}>
        <Typography variant="h5" gutterBottom>
            ログイン
        </Typography>
        <TextField
            label="メールアドレス"
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
            label="パスワード"
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
            ログイン
        </Button>
    </Box>
        // <Box component="form" onSubmit={handleLogin} sx={{ maxWidth: 400, mx: "auto", mt: 5 }}>
        //     <Typography variant="h5" gutterBottom>
        //         Login
        //     </Typography>
        //     <TextField
        //         label="Email"
        //         variant="outlined"
        //         name="mail"
        //         type="email"
        //         fullWidth
        //         margin="normal"
        //         value={formData.mail}
        //         onChange={handleChange}
        //         required
        //     />
        //     <TextField
        //         label="Password"
        //         variant="outlined"
        //         name="password"
        //         type="password"
        //         fullWidth
        //         margin="normal"
        //         value={formData.password}
        //         onChange={handleChange}
        //         required
        //     />
        //     <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 3 }}>
        //         Login
        //     </Button>
        // </Box>
    );
}

export default LoginForm;
