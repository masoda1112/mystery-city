import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { Button, Box } from '@mui/material'
import { fetchImageURL } from '../functions/function'
import SiteHeader from '../components/SiteHeader'

function Correct() {
  const navigate = useNavigate()
  const location = useLocation()
  const [img, setImg] = useState('')

  const questionData = location.state?.questionData

  // level を数値で取得（なければ 1）
  const levelNumber = Number(questionData?.level) || 1
  const stars = "★".repeat(levelNumber)

  useEffect(() => {
    const getImg = async () => {
      if (questionData?.img) {
        const url = await fetchImageURL(questionData.img)
        setImg(url)
      }
    }
    getImg()
  }, [questionData])

  const handleBack = () => {
    navigate('/')
  }

  return (
    <div className="page-root">
      <SiteHeader />

      <div className="page-center">
        <Box
          sx={{
            width: { xs: '90vw', sm: '80vw' },
            maxWidth: 800,
            mt: 4,
            textAlign: 'center',
            position: 'relative',
          }}
        >
          <div className={`certificate level-${levelNumber}`}>
            <div className="cert-series">
              {questionData?.no
                ? `TABINAZO #${String(questionData.no).padStart(3, '0')}`
                : 'TABINAZO #000'}
            </div>

            {/* ★ 星 */}
            <div className="cert-stars">{stars}</div>

            {/* タイトル */}
            <div className="cert-title">
              {questionData?.title || 'テスト'}
            </div>

            {/* 番号 */}
            <div className="cert-rank">
              {questionData?.clearCount
                ? String(questionData.clearCount).padStart(3, '0')
                : '000'}
            </div>
            <div className="cert-rank-caption">
              {questionData?.clearCount
                ? `第${questionData.clearCount}番目の解答者です`
                : '解答者情報なし'}
            </div>
          </div>
          <div className="note-promo">
            <a
                href="https://note.com/tabinazo"
                target="_blank"
                rel="noopener noreferrer"
            >
                ★4以上の問題はこちら
            </a>
          </div>
          <Button
            variant="contained"
            onClick={handleBack}
            sx={{
              mt: 3,
              py: 1.4,
              fontSize: { xs: '1rem', sm: '1.1rem' },
              borderRadius: 2,
              backgroundColor: '#1C1F26',
              color: '#ffffff',
              '&:hover': { backgroundColor: '#101318' },
              boxShadow: 'none',
              textTransform: 'none',
              letterSpacing: '0.03em',
            }}
          >
            戻る
          </Button>
        </Box>
      </div>
    </div>
  )
}

export default Correct
