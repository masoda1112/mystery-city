import React, {useContext, useEffect, useState} from 'react'
import { AppContext } from '../AppContext'
// import Footer from '../components/footer'
// import ButtonContent from '../components/button'
// import Collection from '../components/collections'
// import Header from '../components/header'
// import CorrectPop from '../components/correctpop'
import { TextField, Button, Box, Typography} from '@mui/material'
import {getDocumentsByCondition, updateUserMysteryStatus, updateTotalScore, updateRanking, getLocalstorageUser, updateWhenClear} from '../functions/function'
import { PacmanLoader } from "react-spinners"
import { useNavigate, useLocation } from "react-router-dom"

function Answer() {
    const navigate = useNavigate()
    const location = useLocation()
    const [error, setError] = useState('');
    const {correctPopup, setCorrectPopup} = useContext(AppContext)
    const {setAnswer} = useContext(AppContext)
    const { loading, setLoading } = useContext(AppContext)
    const [formData, setFormData] = useState({
      answer: '',
    });
    // --- ポップアップ状態と画像 ---
    const [popupOpen, setPopupOpen] = useState(false);
    const [popupImg, setPopupImg] = useState("https://dummyimage.com/400x200/39f/fff.png&text=%E6%AD%A3%E8%A7%A3%EF%BC%81");
    // ---

    const handleChange = (e) => {
      setFormData({
          ...formData,
          [e.target.name]: e.target.value
      });
  };

    const handlePathChange = () => {
      navigate("/answer", { replace: true });
    };

    const updateUserStatus =(data) =>{
      if(data[0].mystery_id != null){
        const userData = getLocalstorageUser()
        updateWhenClear(userData.userName, data[0].mystery_id, data[0])
      }
    }
    const handleCorrectPopup =(data)=>{
      if(data.length == 0){
        setError('何かが違うようだ。')
      }else{
        setAnswer(data)
        setPopupOpen(true) // 正解でポップアップON
        // setPopupImg("画像URL"); // ここでダミー以外の画像文字列に切替可
        setError(false)
        updateUserStatus(data)
      }
    }
    const sendAnswer = async(e) => {
      e.preventDefault();
      try{
        setLoading(true)
        const answerData = await getDocumentsByCondition('answers', 'answer', '==', formData.answer)
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
          <div className="page" style={{minHeight: '100vh', background:'#fff'}}>
          <main
            className="content"
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              minHeight: '90vh',
              position: 'relative',
            }}
          >
            <Box
              component="form"
              onSubmit={sendAnswer}
              sx={{
                width: { xs: '90vw', sm: 380 },
                maxWidth: 400,
                mx: 'auto',
                mt: { xs: 4, sm: 6 },
                p: { xs: 0, sm: 0 },              // 余白も極力シンプルに
                background: 'transparent',        // 背景カード色を消す
                borderRadius: 0,                  // 角丸なし
                boxShadow: 'none',                // 影なし（立体感を消す）
                minHeight: 'auto',
                boxSizing: 'border-box',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'stretch',            // フォームを横幅いっぱいに
                position: 'relative',
                gap: 2,                           // 要素の間隔だけ軽く空ける
              }}
            >
              {popupOpen && (
                <div
                  style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    background: '#fff',
                    borderRadius: '14px',
                    boxShadow: '0 2px 20px rgba(0,0,0,0.18)',
                    zIndex: 20,
                    padding: '9px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                  }}
                >
                  <img
                    src={popupImg}
                    alt="正解ポップアップ"
                    style={{
                      width: '320px',
                      maxWidth: '80vw',
                      height: 'auto',
                      display: 'block',
                      borderRadius: '10px',
                    }}
                  />
                </div>
              )}

              <Typography
                variant="h5"
                gutterBottom
                sx={{
                  fontSize: { xs: '1.1rem', sm: '1.4rem' },
                  textAlign: 'center',
                  mb: { xs: 1, sm: 2 },
                }}
              >
                回答を入力してみよう！
              </Typography>

              <TextField
                label="ひらがなで入力してね"
                variant="standard"                 // ⇒ 下線だけのフラットな入力欄
                name="answer"
                fullWidth
                margin="normal"
                value={formData.answer}
                onChange={handleChange}
                required
                error={Boolean(error)}
                helperText={error}
                sx={{
                  background: 'transparent',
                  '& .MuiInputBase-root': { fontSize: { xs: '1rem', sm: '1.1rem' } },
                }}
              />

              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                sx={{
                  mt: 2,
                  py: 1.2,
                  fontSize: { xs: '1rem', sm: '1.05rem' },
                  borderRadius: 9999,              // ボタンだけ少し丸くする（好みで）
                  boxShadow: 'none',               // ボタンの影も消したいなら追加
                }}
              >
                回答を送信
              </Button>
            </Box>

            {loading && (
              <div
                style={{
                  position: 'fixed',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                }}
              >
                <PacmanLoader color="#000000" loading={loading} size={25} />
              </div>
            )}
          </main>
          </div>
      </>
    );
  }
  
  export default Answer;