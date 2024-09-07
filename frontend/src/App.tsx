import React from 'react';
import { CssBaseline, Container } from '@mui/material';
import FileUpload from './compoments/dropzone';

const App = () => {
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
