import React from 'react';
import { CssBaseline, Container } from '@mui/material';
import FileUpload from './compoments/dropzone';
import { ToastProvider } from "react-toast-notifications";
import { useEffect } from 'react';
const App = () => {
  let turn = 0;
  function infiniteLoop() {
    const lgoo = document.querySelector(".App-logo");
    if (lgoo instanceof HTMLElement) {
      turn += 8;
      lgoo.style.transform = `rotate(${turn % 360}deg)`;
    }
  }

  useEffect(() => {
    const loopInterval = setInterval(infiniteLoop, 100);
    return () => clearInterval(loopInterval);
  }, []);

  return (
    <>
      <CssBaseline />
      <Container maxWidth="sm">
        <h1>Multi-File Upload</h1>
        <FileUpload />
      </Container>
    </>
  );
};

export default App;
