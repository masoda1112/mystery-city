import React, { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../firebaseConfig";
import { TextField, Button, Box, Typography } from '@mui/material';


const PasswordReset = () => {
    const [formData, setFormData] = useState({
        mail: ''
    })

    // リセットリンクを送信の処理
    const resetPassword = async (mail) => {
        try {
          await sendPasswordResetEmail(auth, mail);
          alert("パスワードリセットメールを送信しました。");
        } catch (error) {
          console.error("エラー:", error.message);
          alert("メール送信に失敗しました。メールアドレスを確認してください。");
        }
    };

    // 入力された内容を受け止める
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    }

    // サブミットがなされたら走る
    const handleReset = () => {
        if (formData.mail) {
            resetPassword(formData.mail);
        } else {
            alert("メールアドレスを入力してください。");
        }
    };

    return (
        <Box component="form" onSubmit={handleReset} sx={{ maxWidth: 400, mx: "auto", mt: 5 }}>
            <Typography variant="h5" gutterBottom>
                パスワードを再設定
            </Typography>
            <TextField
                label="メールアドレス"
                variant="outlined"
                name="mail"
                tipe='mail'
                fullWidth
                margin="normal"
                value={formData.mail}
                onChange={handleChange}
                required
            />
            <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 3 }}>
                リセットリンクを送信
            </Button>
        </Box>
    );
};

export default PasswordReset;