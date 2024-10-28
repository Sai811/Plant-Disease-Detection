import React, { useState } from 'react';
import Navbar from './navbar';

const Home = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [prediction, setPrediction] = useState('');
  const [imageURL, setImageURL] = useState('');
  const [error, setError] = useState('');

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    if (!selectedFile) {
      setError('Please upload an image file.');
      return;
    }

    const formData = new FormData();
    formData.append('image', selectedFile);

    try {
      const response = await fetch('http://127.0.0.1:5000/predict', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        setPrediction(data.disease); // Set the predicted disease
        setImageURL(`http://127.0.0.1:5000/${data.imagePath}`); // Set the image path
        setError('');
      } else {
        const errorData = await response.json();
        setError('Error: ' + (errorData.message || 'Failed to get prediction.'));
      }
    } catch (error) {
      setError('Error: Failed to fetch the prediction.');
    }
  };

  return (
    <div>
      <Navbar />
      <div className="container">
        <h1>Welcome to Leaf Disease Detection</h1>
        <h2>Upload your image</h2>
        
        <form onSubmit={handleSubmit}>
          <input type="file" onChange={handleFileChange} />
          <button type="submit">Submit</button>
        </form>

        {/* Display prediction */}
        {prediction && (
          <div>
            <h3>Prediction: {prediction}</h3>
          </div>
        )}

        {/* Display image */}
        {imageURL && (
          <div>
            <h3>Uploaded Image:</h3>
            <img src={imageURL} alt="Uploaded Leaf" style={{ maxWidth: '400px', marginTop: '20px' }} />
          </div>
        )}

        {/* Display error */}
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </div>
    </div>
  );
};

export default Home;
