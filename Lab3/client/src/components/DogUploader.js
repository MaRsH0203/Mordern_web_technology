import React, { useState } from 'react';

export default function DogUploader() {
  const [dogUrl, setDogUrl] = useState('');

  const getDogImage = async () => {
    const res = await fetch('https://dog.ceo/api/breeds/image/random');
    const data = await res.json();
    setDogUrl(data.message);
  };

  const uploadDog = async () => {
    await fetch('http://localhost:5000/api/upload-dog', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ imageUrl: dogUrl }),
    });
    alert('Dog image uploaded!');
  };

  return (
    <div>
      <h3>Random Dog Image</h3>
      <button onClick={getDogImage}>Get Dog Image</button>
      {dogUrl && <img src={dogUrl} width={200} alt="dog" />}
      <br />
      <button onClick={uploadDog}>Upload Dog Image</button>
    </div>
  );
}