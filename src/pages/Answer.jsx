import React, {useContext, useEffect, useState} from 'react'
import { AppContext } from '../AppContext'
import { TextField, Button, Box, Typography} from '@mui/material'
import {getDocumentsByCondition, updateDocumentField} from '../functions/function'
import { SquareLoader } from "react-spinners"
import { useNavigate, useLocation } from "react-router-dom"
import SiteHeader from '../components/SiteHeader'

function Answer() {
    const navigate = useNavigate()
    const location = useLocation()
    const [error, setError] = useState('');
    const { loading, setLoading } = useContext(AppContext)
    const [formData, setFormData] = useState({answer: ''});

    const handleChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handlePathChange = () => {
      setLoading(false)
      navigate("/", { replace: true });
    };

    const withTimeout = (promise, timeoutMs = 20000) => {
      return Promise.race([
        promise,
        new Promise((_, reject) => 
          setTimeout(() => reject(new Error('タイムアウト: 接続に時間がかかりすぎています')), timeoutMs)
        )
      ])
    }

    // 正解時 or エラー時必ずローディングを止める
    const handleCorrectPopup = async (questionData, answerText, isNewAnswer = false) => {
      if(questionData.length === 0){
        setError('何かが違うようだ。');
        setLoading(false); return;
      }
      try {
        setError(false)
        // 回答日時・現在日時
        const answeredAt = new Date().toISOString()
        const formattedDate = new Date().toLocaleDateString('ja-JP',{
          year: 'numeric',month: '2-digit',day: '2-digit'});
        let dataToSave = { ...questionData[0], answeredAt, formattedDate }
        // clearCount+1（初回のみ）
        if(isNewAnswer && dataToSave.clearCount!==undefined) {
          const updatedClearCount = (dataToSave.clearCount || 0) + 1
          dataToSave.clearCount = updatedClearCount
          try {
            await withTimeout(
              updateDocumentField('question', 'answer', '==', answerText, {
                clearCount: updatedClearCount
              }), 15000)
          } catch (error) {
            // Firestore書込失敗でも続行
            if(error.code==='permission-denied') {
              console.warn('Firestore update permission denied, but continuing')
            }
          }
        }
        setLoading(false)
        navigate('/correct', { state: { questionData: dataToSave, answeredAt, formattedDate } })
      } catch (error) {
        setError('処理中にエラーが発生しました。もう一度お試しください。');
        setLoading(false)
      }
    };

    const sendAnswer = async(e) => {
      e.preventDefault();
      setLoading(true);
      setError('');
      try{
        const answerText = formData.answer.trim();
        if(!answerText){ setError('回答を入力してください。'); setLoading(false); return; }
        // Firestoreに必ずクエリ
        const questionData = await withTimeout(getDocumentsByCondition('question', 'answer', '==', answerText),20000);
        if(questionData.length>0){
          await handleCorrectPopup(questionData, answerText, true)
        }else{
          setError('何かが違うようだ。'); setLoading(false); return;
        }
      }catch(fetchError){
        // エラー理由に応じて表示
        if(fetchError?.code === 'permission-denied'){
          setError('アクセス権限がありません。Firestoreのセキュリティルールで「question」コレクションの読み取り権限を設定してください。')
        }else if(fetchError.message && fetchError.message.includes('タイムアウト')){
          setError('接続に時間がかかりすぎています。しばらく待ってから再度お試しください。')
        }else{
          setError('エラーが発生しました。もう一度お試しください。')
        }
        setLoading(false)
      }
    };

    useEffect(() => {
      setLoading(false)
      try{
        if(location.pathname !== "/" && location.pathname !== "/correct"){
          handlePathChange()
        }
      }catch(error){console.log(error)}
    }, [location.pathname, setLoading]);

    return (
      <>
        <div className="page-root">
          <SiteHeader />
          <main className="content">
            <Box
              component="form"
              onSubmit={sendAnswer}
              sx={{ width: 'calc(100% - 80px)', maxWidth: 'none', mx: '40px', mt: '40px', p: { xs: 2, sm: 4 }, background: 'transparent', borderRadius: 0, boxShadow: 'none', minHeight: { xs: 280, sm: 320 }, boxSizing: 'border-box', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', position: 'relative', overflow: 'visible', }}
            >
              <Typography variant="h5" gutterBottom sx={{ fontSize: { xs: '1.2rem', sm: '1.6rem' }, textAlign: 'center', mb: { xs: 2, sm: 3 }, }}>
                答えを入力
              </Typography>
              <TextField label="ひらがなで入力" variant="outlined" name="answer" fullWidth margin="normal" value={formData.answer} onChange={handleChange} required error={Boolean(error)} helperText={error} sx={{ fontSize: { xs: '1rem', sm: '1.2rem' }, background: '#fff', }}/>
              <Button type="submit" variant="contained" fullWidth sx={{ mt: 3, py: 1.4, fontSize: { xs: '1rem', sm: '1.1rem' }, borderRadius: 2, backgroundColor: '#1C1F26', color: '#ffffff', '&:hover': { backgroundColor: '#101318', }, boxShadow: 'none', textTransform: 'none', letterSpacing: '0.03em', }}>
                回答を送信
              </Button>
            </Box>
            {loading && (
              <div style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', }}>
                <SquareLoader color="#000000" loading={loading} size={25} />
              </div>
            )}
          </main>
        </div>
      </>
    );
}

export default Answer;