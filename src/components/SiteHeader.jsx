import React from 'react'
import { Typography } from '@mui/material'

function SiteHeader() {
  return (
    <header className="site-header">
      <Typography
        className="site-title"
        sx={{
          fontSize: { xs: '1.2rem', sm: '1.5rem' },
          fontWeight: 600,
          color: '#1C1F26',
        }}
      >
        tabinazo
      </Typography>
    </header>
  )
}

export default SiteHeader

