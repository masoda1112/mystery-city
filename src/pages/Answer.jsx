import React, {useContext, useEffect, useState} from 'react'
import { AppContext } from '../AppContext'
import { TextField, Button, Box, Typography} from '@mui/material'
import {getDocumentsByCondition, getLocalstorageUser, updateWhenClear} from '../functions/function'
import { PacmanLoader } from "react-spinners"
import { useNavigate, useLocation } from "react-router-dom"

function Answer() {
    const navigate = useNavigate()
    const location = useLocation()
    const [error, setError] = useState('');
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
        setError(false)
        updateUserStatus(data)
        // 正解時はページ遷移
        navigate('/correct', { state: { answerData: data } })
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
        if(location.pathname != "/answer" && location.pathname != "/correct"){
          handlePathChange()
        }
      }catch(error){
          console.log(error)
      }
    }, [location.pathname]);

    return (
      <>
          <div className="page" style={{minHeight: '100vh', background:'#fff'}}>
            <main className="content" style={{display:'flex',justifyContent:'center',alignItems:'center',minHeight:'90vh', position:'relative'}}>
              <Box
                component="form"
                onSubmit={sendAnswer}
                sx={{
                  width: { xs: '90vw', sm: 380 },
                  maxWidth: 400,
                  mx: 'auto',
                  mt: { xs: 6, sm: 10 },
                  p: { xs: 2, sm: 4 },
                  background: '#fafbff',
                  borderRadius: 3,
                  boxShadow: { xs: 0, sm: 2 },
                  minHeight: { xs: 280, sm: 320 },
                  boxSizing: 'border-box',
                  display: 'flex', flexDirection: 'column', justifyContent:'center', alignItems:'center',
                  position:'relative',
                  overflow: 'visible'
                }}
              >
                <Typography
                  variant="h5"
                  gutterBottom
                  sx={{ fontSize: { xs: '1.2rem', sm: '1.6rem' }, textAlign: 'center', mb: { xs: 2, sm: 3 } }}
                >
                    回答を入力
                </Typography>
                <TextField
                  label="ひらがなで入力"
                  variant="outlined"
                  name="answer"
                  fullWidth
                  margin="normal"
                  value={formData.answer}
                  onChange={handleChange}
                  required
                  error={Boolean(error)}
                  helperText={error}
                  sx={{ fontSize: { xs: '1rem', sm: '1.2rem' }, background: '#fff' }}
                />
                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  sx={{
                    mt: 3,
                    py: 1.4,
                    fontSize: { xs: '1rem', sm: '1.1rem' },
                    borderRadius: 2,
                    backgroundColor: '#1C1F26',
                    color: '#ffffff',
                    '&:hover': {
                      backgroundColor: '#101318',
                    },
                    boxShadow: 'none',          // 上品に見せる
                    textTransform: 'none',      // 大文字化しない（世界観維持）
                    letterSpacing: '0.03em',    // 少し上品な行間に
                  }}
                >
                  回答を送信
                </Button>
              </Box>
              {loading && (
                <div style={{ position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)"}}>
                    <PacmanLoader color="#000000" loading={loading} size={25} />
                </div>
              )}
            </main>
          </div>
      </>
    );
  }
  
  export default Answer;