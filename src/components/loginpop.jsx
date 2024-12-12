import React, { useState, useContext } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';
import { auth } from '../firebaseConfig';
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import { getDocumentsByCondition, validateLogin } from '../functions/function'
import { AuthContext } from '../AuthContext'
import { AppContext } from '../AppContext';
import { PacmanLoader } from "react-spinners"


function LoginForm() {
    const [formData, setFormData] = useState({
        mail: '',
        password: ''
    })
    const [error, setError] = useState('')
    const navigate = useNavigate()
    const {user, setUser} = useContext(AppContext)
    const {loading, setLoading} = useContext(AppContext)

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    }

    const validateForm = async() => {
        const newErrors = await validateLogin(formData.mail, formData.password)
        const isValid = newErrors == "" ? true : false
        setError(newErrors)
        return isValid
    }

    const handleLogin = async (e) => {
        e.preventDefault();
        const isValid = await validateForm();  // ここでフォームのバリデーションを実行
        if (!isValid) {
            return; // バリデーションが失敗した場合、処理を中断
        }
        try {
            setLoading(true)
            await signInWithEmailAndPassword(auth, formData.mail, formData.password);
            const userData = await getDocumentsByCondition('users', 'mail', '==', formData.mail);
            // データが見つかった場合
            if (userData.length > 0) {
                localStorage.setItem('user', JSON.stringify(userData[0]));
                setUser(JSON.parse(localStorage.getItem('user')));
            } else {
            // setError('User not found');
            }
            // console.log(localStorage)
            navigate('/answer'); 
        } catch (error) {
            const errors = {mail: "", password: ""}
            if (error.code === "auth/user-not-found") {
                errors.mail = "登録されていないメールアドレスです"
            } else if (error.code === "auth/wrong-password") {
                errors.password = "パスワードが正しくありません"
            } else {
                errors.mail = "ログインに失敗しました"
            }
            setError(errors)
        }finally{
            setLoading(false)
        }
    }

    return (
        <Box component="form" onSubmit={handleLogin} sx={{ maxWidth: 400, mx: "auto", mt: 5 }}>
        <Typography variant="h5" gutterBottom>
            ログイン
        </Typography>
        <TextField
            label="メールアドレス"
            variant="outlined"
            name="mail"
            fullWidth
            margin="normal"
            value={formData.mail}
            onChange={handleChange}
            required
            error={Boolean(error.mail)}
            helperText={error.mail}
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
            error={Boolean(error.password)}
            helperText={error.password}
        />
        <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 3 }}>
            ログイン
        </Button>
        {loading && (
            <div style={{ position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)"}}>
                <PacmanLoader color="#000000" loading={loading} size={25} />
            </div>
        )}
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
