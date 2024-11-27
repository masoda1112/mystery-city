import React, { useState, useContext } from 'react'
import { TextField, Button, Box, Typography, FormControl, InputLabel, Select, MenuItem } from '@mui/material'
import { doc, setDoc } from 'firebase/firestore'
import { auth, Firestore } from '../firebaseConfig'
import { createUserWithEmailAndPassword } from "firebase/auth"
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../AppContext'
import { addNewDocumentWithID, addToRankArray, setLocalStorageItem } from '../functions/function'

function SignUpForm() {
    const [formData, setFormData] = useState({
        userName: '',
        mail: '',
        password: ''
    });
    const [error, setError] = useState('');
    const {user, setUser} = useContext(AppContext)
    const navigate = useNavigate();

    // フォームデータの読み込み
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    // authアカウント作成, authデータをレスポンス
    const addAuthAcount = async(auth, mail, password) => {
        const userCredential = await createUserWithEmailAndPassword(auth, mail, password);
        return userCredential.user
    }

    const buildUserData = (name, mail, password) => {
        const data = {
            userName: name,
            mail: mail,
            password: password,
            totalScore: 0,
            createdAt: new Date(),
        }

        return data
    }

    const buildDefaultMysteriesStatus = () =>{
        let arr = []
        let count = 1
        while (count < 30){
            let data = {mystery_id: count, status: 1}
            arr.push(data)
            count ++
        }
        return arr
    }

    // バリデーション関数
    const validateForm = () => {
        const newErrors = { userName: "", mail: "", password: "" };
        let isValid = true;

        // ユーザーネームのバリデーション
        if (!formData.userName) {
            newErrors.userName = "ユーザーネームは必須です";
            isValid = false;
            console.log(newErrors.userName)
        }

        // メールアドレスのバリデーション
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!formData.mail) {
            newErrors.mail = "メールアドレスは必須です";
            isValid = false;
            } else if (!emailRegex.test(formData.mail)) {
            newErrors.mail = "メールアドレスの形式が無効です";
            isValid = false;
            console.log(newErrors.mail)
        }

        // パスワードのバリデーション
        if (!formData.password) {
            newErrors.password = "パスワードは必須です";
            isValid = false;
          } else if (formData.password.length < 8) {
            newErrors.password = "パスワードは8文字以上である必要があります";
            isValid = false;
            console.log(newErrors.password)
          }

        setError(newErrors);
        return isValid;
    };
    

    // サインアップの処理
    const handleSignUp = async (e) => {
        e.preventDefault();
        const isValid = validateForm();  // ここでフォームのバリデーションを実行
    
        if (!isValid) {
            return; // バリデーションが失敗した場合、処理を中断
        }

        try {
            const user = await addAuthAcount(auth, formData.mail, formData.password)
            // fireStore用のuserData再定義
            const userData = buildUserData(formData.userName, formData.mail, formData.password)
            
            // mysteriesStatusをid1~30まで先に保存しておく。全て未購入状態
            const mysteriesStatus = buildDefaultMysteriesStatus()

            // user,userMysteryStatusに新しいdocを追加
            await addNewDocumentWithID('users', user.uid, userData)
            await addNewDocumentWithID('userMysteryStatus', user.uid, {mysteriesStatus})

            // ローカルストレージにuser情報格納
            setLocalStorageItem('user', userData)

            // rankingに追加
            await addToRankArray(0, user.uid)
            
            // mysteriesにリダイレクト
            navigate('/mysteries'); 
            
        } catch (error) {
            console.log(error.message)
            setError(error.message);
        }
    };
    

    return (
        <Box component="form" onSubmit={handleSignUp} sx={{ maxWidth: 400, mx: "auto", mt: 5 }}>
            <Typography variant="h5" gutterBottom>
                さあ、旅に出かけよう！
            </Typography>
            <TextField
                label="ユーザーネーム"
                variant="outlined"
                name="userName"
                fullWidth
                margin="normal"
                value={formData.userName}
                onChange={handleChange}
                required
                error={Boolean(error.userName)}
                helperText={error.userName}
            />
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
                登録
            </Button>
        </Box>
    );
}

export default SignUpForm;