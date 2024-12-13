import React, { useState, useContext } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';
import { auth } from '../firebaseConfig';
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import { getDocumentsByCondition, validateLogin, getLocalstorageUser } from '../functions/function'
import { AppContext } from '../AppContext';
import { PacmanLoader } from "react-spinners"


function LoginForm() {
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        mail: '',
        password: ''
    })
    const [error, setError] = useState('')
    const {setUser} = useContext(AppContext)
    const {loading, setLoading} = useContext(AppContext)
    const {setPasswordResetPop} = useContext(AppContext)
    const {setLoginPopup} = useContext(AppContext)

    // フォームデータの制御
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    }

    // バリデーションの判断
    const validateForm = async() => {
        const newErrors = await validateLogin(formData.mail, formData.password)
        const isValid = newErrors == "" ? true : false
        setError(newErrors)
        return isValid
    }

    const buildErrorMessage = (error) => {
        // エラーメッセージの取得
        const errors = {mail: "", password: ""}
        if (error.code === "auth/user-not-found") {
            errors.mail = "登録されていないメールアドレスです"
        } else if (error.code === "auth/wrong-password") {
            errors.password = "パスワードが正しくありません"
        } else {
            errors.mail = "ログインに失敗しました"
        }
        return errors
    }

    // passwordRestPopの制御
    const handlePasswordResetPop = () =>{
        setPasswordResetPop(true)
        setLoginPopup(false)
    }

    // userDataが見つかったらuser（Stateを更新し、localStorageに登録する）
    const updateUserStateAndLocalStorage = async() =>{
        const userData = await getDocumentsByCondition('users', 'mail', '==', formData.mail);
        if (userData.length > 0) {
            localStorage.setItem('user', JSON.stringify(userData[0]));
            setUser(userData[0]);
        }else{
            throw new Error("auth/user-not-found");
        }
    }

    // ログイン処理
    const handleLogin = async (e) => {
        e.preventDefault();
        const isValid = await validateForm(); 
        if (!isValid) {
            return; // バリデーションが失敗した場合、処理を中断
        }
        try {
            setLoading(true)
            // authを取得
            await signInWithEmailAndPassword(auth, formData.mail, formData.password);
            // userDataをfireStoreから取得し、stateとlocalstorageに登録
            updateUserStateAndLocalStorage()
            navigate('/answer'); 
        } catch (error) {
            // エラーメッセージの取得
            const errors = buildErrorMessage(error)
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
            <p onClick={handlePasswordResetPop} style={{paddingTop: '20px', color: 'red', textDecoration: 'underline'}}>パスワードをお忘れの方はこちら</p>
            {loading && (
                <div style={{ position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)"}}>
                    <PacmanLoader color="#000000" loading={loading} size={25} />
                </div>
            )}
        </Box>
    );
}

export default LoginForm;
