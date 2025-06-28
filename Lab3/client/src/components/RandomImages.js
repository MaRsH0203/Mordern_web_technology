import React, { useState } from 'react';

export default function RandomImages() {
  const [images, setImages] = useState([]);

  const fetchImages = async () => {
    const res = await fetch('http://localhost:5000/api/random-images');
    const data = await res.json();
    setImages(data);
  };

  return (
    <div>
      <h3>Random Images from Server</h3>
      <button onClick={fetchImages}>Get Random Images</button>
      <div style={{ display: 'flex', gap: '10px' }}>
        {images.map((src, i) => (
          <img key={i} src={src} width={150} alt={`random-${i}`} />
        ))}
      </div>
    </div>
  );
}