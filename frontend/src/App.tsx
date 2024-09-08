import React from 'react';
import { CssBaseline, Container } from '@mui/material';
import Dropzone from './compoments/dropzone';
import { ToastProvider } from "react-toast-notifications";
const App = () => {
  return (
    <ToastProvider>
      <CssBaseline />
      <Container maxWidth="sm">
        <Dropzone />
      </Container>
    </ToastProvider>
  );
};

export default App;
