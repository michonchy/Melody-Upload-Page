import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Box, Button, createTheme, IconButton, ThemeProvider } from '@mui/material';
import { height } from '@mui/system';
const theme = createTheme();
function App() {
  return (
    <ThemeProvider theme={theme} >
      <Box justifyContent={"center"} alignItems={"center"} sx={{
        display: 'flex',
        backgroundColor: "#DAC7C8",
        height: '100vh'
      }}>
        <Button variant="contained" sx={{
          size: "large",
          color: "#E7D5E5", // # 赤(0〜255) 緑(0〜255) 青(0〜255) => #00FF00 RedGreenBlue
          backgroundColor: "#FFFFFF",
          fontSize: 30,
          fontWeight: "bold",
        }}>Upload</Button>
      </Box>
    </ThemeProvider>
  );
}

export default App;



/* <html> 開始タグ
  <img src="https://image.com/12345" /> 開始&終了タグ
</html> 閉じタグ */

// 1行コメント
/* 複数行コメント */
