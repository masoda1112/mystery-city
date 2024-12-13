import React, {useContext, useEffect, useState} from 'react'
import { AppContext } from '../AppContext'
import Footer from '../components/footer'
import ButtonContent from '../components/button'
import Collection from '../components/collections'
import Header from '../components/header'
import CorrectPop from '../components/correctpop'
import { TextField, Button, Box, Typography} from '@mui/material'
import {getDocumentsByCondition, updateUserMysteryStatus, updateTotalScore, updateRanking, getLocalstorageUser, updateWhenClear} from '../functions/function'
import { PacmanLoader } from "react-spinners"
import { useNavigate, useLocation } from "react-router-dom"

function Answer() {
    // フォームデータの読み込み
    const navigate = useNavigate()
    const location = useLocation()
    const [error, setError] = useState('');
    const {correctPopup, setCorrectPopup} = useContext(AppContext)
    const {setAnswer} = useContext(AppContext)
    const { loading, setLoading } = useContext(AppContext)
    const [formData, setFormData] = useState({
      answer: '',
    });

    const handleChange = (e) => {
      setFormData({
          ...formData,
          [e.target.name]: e.target.value
      });
  };

    // 変なパスで飛んできたら、answerに書き換える
    const handlePathChange = () => {
      navigate("/answer", { replace: true }); // replace: 履歴を上書き
    };

    //ユーザーのステータス（user.score, userMysteryStatus, ranking）を更新
    const updateUserStatus =(data) =>{
      // mysteryStatusを更新（非同期処理で良いのでawaitいらない?）
      if(data[0].mystery_id != null){
        const userData = getLocalstorageUser()
        // この中で回答済みか判断し、ランキングとスコアを更新
        updateWhenClear(userData.userName, data[0].mystery_id, data[0])
      }
    }
    
    // 正解ならポップアップ表示、
    const handleCorrectPopup =(data)=>{
      if(data.length == 0){
        setError('何かが違うようだ。')
      }else{
        setAnswer(data)
        setCorrectPopup(true)
        setError(false)
        // mysteryStatusを更新（非同期処理で良いのでawaitいらない?）
        updateUserStatus(data)
      }
    }

    // 答えを送信し、確認
    const sendAnswer = async(e) => {
      e.preventDefault();
      // APIで回答を検索
      try{
        setLoading(true)
        const answerData = await getDocumentsByCondition('answers', 'answer', '==', formData.answer)
        // 正解だったらpopupを表示
        handleCorrectPopup(answerData)
      }catch(error){

      }finally{
        setLoading(false)
      }
    }

    useEffect(() => {
      try{
        if(location.pathname != "/answer"){
          handlePathChange()
        }
      }catch(error){
          console.log(error)
      }
    }, [correctPopup]);

    return (
      <>
          <div className="page">
            <main className="content">
              <Box component="form" onSubmit={sendAnswer} sx={{ maxWidth: 400, mx: "auto", mt: 5 }}>
                <Typography variant="h5" gutterBottom>
                    回答を入力してみよう！
                </Typography>
                <TextField
                    label="ひらがなで入力してね"
                    variant="outlined"
                    name="answer"
                    fullWidth
                    margin="normal"
                    value={formData.answer}
                    onChange={handleChange}
                    required
                    error={Boolean(error)}
                    helperText={error}
                />
                <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 3 }}>
                    回答を送信
                </Button>
              </Box>
              {loading && (
                <div style={{ position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)"}}>
                    <PacmanLoader color="#000000" loading={loading} size={25} />
                </div>
              )}
            </main>
            <CorrectPop />
          </div>
      </>
    );
  }
  
  export default Answer;