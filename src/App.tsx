import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { AppBar, Box, Button, createTheme, Tab, Tabs, ThemeProvider, Toolbar } from '@mui/material';
import { Input } from '@mui/material';
import AWS from "aws-sdk";
import axios from 'axios';
import fileDownload from 'js-file-download';
import { orange, grey } from '@mui/material/colors';


AWS.config.update({
   accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY,
   secretAccessKey: process.env.REACT_APP_AWS_SECRET_KEY
})

const s3 = new AWS.S3({
  apiVersion: "2006-03-01",
  region: 'ap-northeast-1',
})

function TabPanel(props: {
  value: number,
  index: number,
  children: React.ReactNode
}) {
  return (
    <div>
      {
        props.value === props.index && (
          props.children
        )
      }
    </div>
  )
}
function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}
function UploadView() {
  const [file, setFile] = useState(undefined as (File | undefined));
  return (
    <div>
      <Box sx={{
        height: '50vh'
      }}>
            <Input onChange={ (event) => {
              setFile(change_input(event)) ; // ❶
            }} type="file" name="file1" id="file1" /><br /><br />
          <button onClick={() => {
            if (file) {
              upload(file); // ❷
            }
          }} 
          // sx={{
          //   size: "large",
          //   color: "#E7D5E5", // # 赤(0〜255) 緑(0〜255) 青(0〜255) => #00FF00 RedGreenBlue
          //   backgroundColor: "#FFFFFF",
          //   fontSize: 30,
          //   fontWeight: "bold",
          //   "&:hover": {
          //     background: "#E7D5E5"
          //   },
          // }}
          >Upload</button>
          </Box>
    </div>
  )
}
function MusicListView() {
  const [musics, setMusics] = useState([] as Array<string>);
  const musicURL = "https://9u3kgnfgt1.execute-api.ap-northeast-1.amazonaws.com/development/music"
  useEffect(() => {
    axios.get(musicURL).then((response) => {
      console.log(response.data)
      setMusics(response.data.musics);
    });
  }, []);
  return (
    <Box sx={{
      height: '50vh'
    }}>
      {
            musics.map((music) => {
              return (
                <Box key={music}><Button onClick={() => {
                  console.log(music)
                  s3.getObject({
                    Bucket:'melody-api-development-movie-contents',
                    Key:music,
                  }, (err: AWS.AWSError, data: AWS.S3.GetObjectOutput) => {
                    console.log(data.Body)
                    if (data.Body === undefined) {
                      return;
                    }
                    fileDownload(data.Body as ArrayBuffer,music)
                  })
                }}>{music}</Button></Box>
              )
            })
          }
    </Box>
  )
}

const theme = createTheme({
  palette: {
    primary: {
      main: orange[900],
    },
    secondary: {
      main: 'white',
      contrastText: '#ffcc00',
    },
    text: {
      primary: grey[900],
      secondary: grey[800],
    },
  }
});
function App() {
  const [tabIndex,setTabIndex] = useState(0)
  return (
    <ThemeProvider theme={theme} >
      <AppBar>
      <Box display="flex">
      <Toolbar>Melody App</Toolbar>
      <Tabs variant="fullWidth" textColor="secondary" value={tabIndex} sx={{
        accentColor: "yellow"
      }} onChange={(_, newValue: number) => {
              setTabIndex(newValue);
            }} aria-label="basic tabs example">
              <Tab sx={{
                color: "red"
              }} label="Item One" {...a11yProps(0)} />
              <Tab sx={{
                
                color: "red"
              }}  label="Item Two" {...a11yProps(1)} />
            </Tabs>
      </Box>
      </AppBar>
      <Box justifyContent={"center"} alignItems={"center"} sx={{
        display: 'flex',
        backgroundColor: "#DAC7C8",
        height: '100vh'
      }}>
        <Box flexDirection={"column"}>
          <Box sx={{ 
            borderBottom: 1, 
            borderColor: 'divider',
            width: '100%'
          }}>
            
          </Box>
          <TabPanel value={tabIndex} index={0}>
            {UploadView()}
          </TabPanel>
          <TabPanel value={tabIndex} index={1}>
            {MusicListView()}
          </TabPanel>
        </Box>
        
      </Box>
    </ThemeProvider>
  );
}

export default App;

function upload(file: File) {
  console.log("OK",file);
  s3.upload({
    Bucket: "melody-api-development-movie-contents",
    Key: "movie/"+file.name, 
    Body: file,
    ACL: "public-read"
  }, (error, data) => {
    console.log({data});
    console.log({error});
  });
}

function change_input(event: any): File {
  const target = event.target;
  console.log({target});
  return event.target.files[0];
}
