import React, { useState } from 'react';
import axios from 'axios';

const PlantDiseaseDetection = ({ onPrediction }) => {
  const [file, setFile] = useState(null);
  const [imageUrl, setImageUrl] = useState('');

  // Handle file input change
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  // Handle form submission to send the image to the backend
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      alert('Please upload an image');
      return;
    }

    const formData = new FormData();
    formData.append('imagefile', file);

    try {
      // Make a POST request to the Flask backend to upload the image
      const response = await axios.post('http://localhost:5000/predict', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      // Set prediction result and image URL
      const prediction = response.data.prediction;
      const imageUrl = response.data.image_url;

      // Send the prediction back to Home component using the onPrediction prop
      onPrediction(prediction);
      
      // Set the image URL to display the uploaded image
      setImageUrl(imageUrl);
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  return (
    <div>
      <h2>Plant Disease Detection</h2>

      {/* Image Upload Form */}
      <form onSubmit={handleSubmit}>
        <input type="file" accept="image/*" onChange={handleFileChange} /> {/* File input */}
        <button type="submit">Upload Image</button> {/* Submit button */}
      </form>

      {/* Display the uploaded image */}
      {imageUrl && (
        <div>
          <h3>Uploaded Image:</h3>
          <img
            src={`http://localhost:5000${imageUrl}`}
            alt="Uploaded"
            style={{ maxWidth: '100%', height: 'auto' }}
          />
        </div>
      )}
    </div>
  );
};

export default PlantDiseaseDetection;
