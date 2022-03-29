import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { Box, Button, createTheme, ThemeProvider } from '@mui/material';
import { Input } from '@mui/material';
import AWS from "aws-sdk";


AWS.config.update({
   accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY,
   secretAccessKey: process.env.REACT_APP_AWS_SECRET_KEY
})

const s3 = new AWS.S3({
  apiVersion: "2006-03-01",
  region: 'ap-northeast-1',
})

const theme = createTheme();
function App() {
  const [file, setFile] = useState(undefined as (File | undefined));
  return (
    <ThemeProvider theme={theme} >
      <Box justifyContent={"center"} alignItems={"center"} sx={{
        display: 'flex',
        backgroundColor: "#DAC7C8",
        height: '100vh'
      }}>
        <Box flexDirection={"column"}>
          <Box>
            <Input onChange={ (event) => {
              setFile(change_input(event)) ; // ❶
            }} type="file" name="file1" id="file1" /><br /><br />
          </Box>
          <Button onClick={() => {
            if (file) {
              upload(file); // ❷
            }
          }} variant="contained" sx={{
            size: "large",
            color: "#E7D5E5", // # 赤(0〜255) 緑(0〜255) 青(0〜255) => #00FF00 RedGreenBlue
            backgroundColor: "#FFFFFF",
            fontSize: 30,
            fontWeight: "bold",
            "&:hover": {
              background: "#E7D5E5"
            },
          }}>Upload</Button>
        </Box>
        
      </Box>
    </ThemeProvider>
  );
}

export default App;

function upload(file: File) {
  console.log("OK",file);
  s3.upload({
    Bucket: "melody-api-app.development.movie-contents",
    Key: file.name, 
    Body: file,
    ACL: "public-read"
  }, (data, error) => {
    console.log({data});
    console.log({error});
  });
}

function change_input(event: any): File {
  const target = event.target;
  console.log({target});
  return event.target.files[0];
}
