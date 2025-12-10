// src/pages/Admin.jsx
import React, { useState, useEffect } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  MenuItem,
  Alert,
  IconButton,
} from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
import SiteHeader from '../components/SiteHeader';
import {
  addDocument,
  getCollectionDocumentsWithSort,
  checkDuplicateAnswer,   // ★ 重複チェック用
} from '../functions/function';

function Admin() {
  const [form, setForm] = useState({
    no: '',
    title: '',
    answer: '',
    level: '1',
  });
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [loadingNo, setLoadingNo] = useState(false);

  // no を自動採番する関数
  const fetchNextNo = async () => {
    setLoadingNo(true);
    setMessage((prev) =>
      prev.type === 'success' ? prev : { type: '', text: '' }
    );

    try {
      // question コレクションを no で降順ソート
      const docs = await getCollectionDocumentsWithSort('question', 'no');

      let nextNo = 1;
      if (docs && docs.length > 0) {
        // docs[0] が no の最大値（desc で取得しているため）
        const maxNo = Number(docs[0].no || 0);
        nextNo = maxNo + 1;
      }

      setForm((prev) => ({
        ...prev,
        no: String(nextNo),
      }));
    } catch (err) {
      console.error('no の自動採番取得に失敗:', err);
      setMessage({
        type: 'error',
        text: 'no の自動採番取得に失敗しました。コンソールを確認してください。',
      });
    } finally {
      setLoadingNo(false);
    }
  };

  // 初回マウント時に自動採番
  useEffect(() => {
    fetchNextNo();
  }, []);

  // title / answer 用の onChange（ここでは制限しない）
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ type: '', text: '' });

    if (!form.no || !form.title || !form.answer || !form.level) {
      setMessage({ type: 'error', text: 'すべての項目を入力してください。' });
      return;
    }

    const noNum = Number(form.no);
    const levelNum = Number(form.level);
    if (Number.isNaN(noNum) || Number.isNaN(levelNum)) {
      setMessage({ type: 'error', text: 'no と level は数値で入力してください。' });
      return;
    }

    const trimmedAnswer = form.answer.trim();

    // ▼ ひらがなチェック（ぁ〜ん と 長音 ー）
    const hiraganaRegex = /^[ぁ-んー]+$/;
    if (!hiraganaRegex.test(trimmedAnswer)) {
      setMessage({
        type: 'error',
        text: '答えは ひらがな（ぁ〜ん・ー）だけで入力してください。',
      });
      return;
    }

    // ▼ Firestore 上で answer の重複チェック
    try {
      const isDup = await checkDuplicateAnswer(trimmedAnswer);
      if (isDup) {
        setMessage({
          type: 'error',
          text: 'この答えはすでに登録されています。（answer の重複）',
        });
        return;
      }
    } catch (err) {
      console.error('answer 重複チェックに失敗:', err);
      setMessage({
        type: 'error',
        text: '答えの重複チェックに失敗しました。しばらくしてから再度お試しください。',
      });
      return;
    }

    const data = {
      no: noNum,
      title: form.title,
      answer: trimmedAnswer,
      level: levelNum,
      clearCount: 0,
      createdAt: new Date().toISOString(), // 任意
    };

    try {
      setSaving(true);
      await addDocument('question', data);

      setMessage({ type: 'success', text: '問題を追加しました。' });
      // タイトル・答え・レベルだけリセットして、no は次の番号に更新
      setForm({
        no: '',
        title: '',
        answer: '',
        level: '1',
      });
      fetchNextNo();
    } catch (err) {
      console.error(err);
      setMessage({
        type: 'error',
        text: '保存に失敗しました。コンソールを確認してください。',
      });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="page-root">
      <SiteHeader />

      <main className="content">
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            width: '100%',
            maxWidth: 480,
            mx: 'auto',
            mt: 4,
            px: 3,
            pb: 4,
            boxSizing: 'border-box',
          }}
        >
          <Typography
            variant="h5"
            sx={{ mb: 3, textAlign: 'center', fontSize: { xs: '1.3rem', sm: '1.5rem' } }}
          >
            問題追加（管理用）
          </Typography>

          {/* no（自動採番） */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <TextField
              label="問題番号 (no)"
              name="no"
              type="number"
              value={form.no}
              fullWidth
              margin="normal"
              InputProps={{ readOnly: true }}
              helperText="question コレクションの最大 no + 1 を自動採番"
            />
            <IconButton
              onClick={fetchNextNo}
              disabled={loadingNo}
              sx={{ mt: '8px' }}
              size="small"
            >
              <RefreshIcon fontSize="small" />
            </IconButton>
          </Box>

          <TextField
            label="タイトル (title)"
            name="title"
            value={form.title}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />

          <TextField
            label="答え (answer)"
            name="answer"
            value={form.answer}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
            helperText="ひらがな想定"
          />

          <TextField
            select
            label="レベル (level)"
            name="level"
            value={form.level}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, level: e.target.value }))
            }
            fullWidth
            margin="normal"
            required
          >
            {[1, 2, 3, 4, 5, 6, 7, 8].map((lv) => (
              <MenuItem key={lv} value={lv.toString()}>
                {`LEVEL ${lv}`}
              </MenuItem>
            ))}
          </TextField>

          {message.text && (
            <Alert
              severity={message.type === 'success' ? 'success' : 'error'}
              sx={{ mt: 2 }}
            >
              {message.text}
            </Alert>
          )}

          <Button
            type="submit"
            variant="contained"
            fullWidth
            disabled={saving || loadingNo}
            sx={{
              mt: 3,
              py: 1.2,
              borderRadius: 2,
              backgroundColor: '#1C1F26',
              '&:hover': { backgroundColor: '#101318' },
              textTransform: 'none',
              letterSpacing: '0.04em',
            }}
          >
            {saving ? '保存中…' : '問題を追加'}
          </Button>
        </Box>
      </main>
    </div>
  );
}

export default Admin;
