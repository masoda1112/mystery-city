import React, {useContext, useState} from 'react'
import { AppContext } from '../AppContext'
import Footer from '../components/footer'
import ButtonContent from '../components/button'
import Collection from '../components/collections'
import Header from '../components/header'
import CorrectPop from '../components/correctpop'
import { TextField, Button, Box, Typography} from '@mui/material'
import {getDocumentsByCondition} from '../functions/function'

function Answer() {
    // フォームデータの読み込み
    const [formData, setFormData] = useState({
      answer: '',
    });
    const [error, setError] = useState('');
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };
    const {correctPopup, setCorrectPopup} = useContext(AppContext)
    const {answer, setAnswer} = useContext(AppContext)

    const sendAnswer = async(e) => {
      e.preventDefault();
      // APIで回答を検索
      try{
        const answerData = await getDocumentsByCondition('answers', 'answer', '==', formData.answer)
        console.log(answerData.length)
        // 正解だったらpopupを表示
        if(answerData.length == 0){
          console.log('不正解')
          setError('何かが違うようだ。')
        }else{
          setAnswer(answerData)
          setCorrectPopup(true)
          setError(false)
        }
      }catch(error){

      }

    }
    return (
      <>
          <div className="page">
            <Header title={"Answer"}/>
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
            </main>
            <CorrectPop />
            <Footer />
          </div>
      </>
    );
  }
  
  export default Answer;