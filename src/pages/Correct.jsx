import React, {useState, useEffect} from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { Button, Box } from '@mui/material'
import {fetchImageURL} from '../functions/function'

function Correct() {
    const navigate = useNavigate()
    const location = useLocation()
    const [img, setImg] = useState('')
    const answerData = location.state?.answerData

    useEffect(() => {
        const getImg = async() => {
            if (answerData && answerData[0]?.img) {
                const url = await fetchImageURL(answerData[0].img)
                setImg(url)
            }
        }
        getImg()
    }, [answerData])

    const handleBack = () => {
        navigate('/answer')
    }

    return (
            <div
                className="page"
                style={{
                    minHeight: '100vh',
                    background: '#fff',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <Box
                    sx={{
                    width: { xs: '90vw', sm: '80vw' },
                    maxWidth: 800,
                    textAlign: 'center',
                    position: 'relative',
                    }}
                >
                    <div className="certificate-wrap">
                    <div className="certificate">
                        <div className="cert-header">
                        <div className="cert-series">
                            MYSTERY CITY CHALLENGE #012
                            {/* {`MYSTERY CITY CHALLENGE #${seriesNumber}`} みたいに差し替え */}
                        </div>
                        <div className="cert-label">SOLVER CERTIFICATE</div>
                        </div>

                        <div className="cert-main">
                        <div className="cert-rank">
                            023
                            {/* {String(solverOrder).padStart(3, '0')} */}
                        </div>
                        <div className="cert-rank-caption">
                            You are the 23rd solver.
                            {/* {`You are the ${solverOrder}th solver.`} */}
                        </div>
                        </div>

                        <div className="cert-footer">
                        <div className="cert-date">
                            Solved on: 2025-01-21
                            {/* {`Solved on: ${solvedDate}`} */}
                        </div>
                        <div className="cert-brand">mystery.city</div>
                        </div>
                    </div>
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
                            '&:hover': {
                            backgroundColor: '#101318'
                            },
                            boxShadow: 'none',           // 高級感を出すため影を消す（任意）
                            textTransform: 'none',       // ボタン文字を大文字化しない
                            letterSpacing: '0.03em',     // ほんの少し間を空けて上品に
                        }}
                    >
                        戻る
                    </Button>
                </Box>
            </div>

    )
}

export default Correct

