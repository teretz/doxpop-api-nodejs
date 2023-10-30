import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [result, setResult] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);

  const triggerApiCall = () => {
    axios.get('/api/some-endpoint')
      .then(response => {
        setResult(`API Response: ${JSON.stringify(response.data)}`);
      })
      .catch(error => {
        setResult(`API Error: ${error}`);
        console.error(`API Error: ${error}`);
      });
  };

  const handleFileUpload = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const uploadFile = () => {
    const formData = new FormData();
    formData.append('file', selectedFile);
    axios.post('/api/upload', formData)
      .then(response => {
        setResult(`File Upload Successful: ${JSON.stringify(response.data)}`);
      })
      .catch(error => {
        setResult(`File Upload Error: ${error}`);
        console.error(`File Upload Error: ${error}`);
      });
  };

  return (
    <div className="App">
      <h1>Doxpop API NodeJS Frontend</h1>
      <button onClick={triggerApiCall}>Trigger API Call</button>
      <input type="file" onChange={handleFileUpload} />
      <button onClick={uploadFile}>Upload File</button>
      <div>{result}</div>
    </div>
  );
}

export default App;