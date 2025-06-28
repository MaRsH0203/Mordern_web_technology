import React from 'react';
import MultiUpload from './components/MultiUpload';
import RandomImages from './components/RandomImages';
import DogUploader from './components/DogUploader';

function App() {
  return (
    <div style={{ padding: '20px' }}>
      <h1>Image Uploader</h1>
      <MultiUpload />
      <hr />
      <RandomImages />
      <hr />
      <DogUploader />
    </div>
  );
}

export default App;