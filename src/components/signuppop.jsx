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
        console.log("0", userCredential)
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
    

    // サインアップの処理
    const handleSignUp = async (e) => {
        e.preventDefault();
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
        />
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
            登録
        </Button>
    </Box>
        // <Box component="form" onSubmit={handleSignUp} sx={{ maxWidth: 400, mx: "auto", mt: 5 }}>
        //     <Typography variant="h5" gutterBottom>
        //         Let the journey begin!
        //     </Typography>
        //     <TextField
        //         label="User Name"
        //         variant="outlined"
        //         name="userName"
        //         fullWidth
        //         margin="normal"
        //         value={formData.userName}
        //         onChange={handleChange}
        //         required
        //     />
        //     <FormControl fullWidth margin="normal">
        //         {/* <InputLabel>Nationality</InputLabel> */}
        //         <Select
        //             name="nationality"
        //             value={formData.nationality}
        //             onChange={handleChange}
        //             displayEmpty
        //             label="Nationality"
        //             renderValue={(selected) => {
        //                 if (selected === "") {
        //                     return <em>Nationality</em>;
        //                 }
        //                 return selected;
        //             }}
        //             fullWidth
        //         >
        //             <MenuItem value="">
        //                 <em>Nationality</em>
        //             </MenuItem>
        //             <MenuItem value="Japan">Japan</MenuItem>
        //             <MenuItem value="USA">USA</MenuItem>
        //             <MenuItem value="Canada">Canada</MenuItem>
        //             <MenuItem value="Australia">Australia</MenuItem>
        //             <MenuItem value="UK">UK</MenuItem>
        //             {/* 他の国も追加可能 */}
        //         </Select>
        //     </FormControl>
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
        //         Sign Up
        //     </Button>
        // </Box>
    );
}

export default SignUpForm;