import React, { useState } from 'react';
import { Typography, IconButton, Menu, MenuItem } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';


function SiteHeader() {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <header className="site-header" style={{ position: 'relative' }}>
      {/* 中央タイトル */}
      <Typography
        className="site-title"
        sx={{
          fontSize: { xs: '1.2rem', sm: '1.5rem' },
          fontWeight: 600,
          color: '#1C1F26',
          textAlign: 'center',
        }}
      >
        tabinazo
      </Typography>

      {/* ハンバーガーメニュー */}
      <IconButton
        onClick={handleOpen}
        sx={{
          position: 'absolute',
          right: 16,
          top: '50%',
          transform: 'translateY(-50%)',
          color: '#1C1F26',
        }}
      >
        <MenuIcon />
      </IconButton>

      {/* メニュー内容 */}
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        <MenuItem onClick={handleClose} component="a" href="/about">
          このサイトについて
        </MenuItem>
        <MenuItem onClick={handleClose} component="a" href="/howto">
          遊び方
        </MenuItem>
        <MenuItem onClick={handleClose} component="a" href="/privacy">
          プライバシーポリシー
        </MenuItem>
        <MenuItem
          onClick={handleClose}
          component="a"
          href="https://instagram.com/tabinazo"
          target="_blank"
        >
          Instagram
        </MenuItem>
        <MenuItem
          onClick={handleClose}
          component="a"
          href="https://note.com/tabinazo"
          target="_blank"
        >
          note（高難易度問題）
        </MenuItem>
      </Menu>
    </header>
  );
}

export default SiteHeader;
