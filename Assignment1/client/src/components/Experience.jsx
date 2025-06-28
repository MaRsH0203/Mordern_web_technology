import React, { useEffect, useState } from 'react';

function Experience() {
  const [exp, setExp] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8000/getExp')
      .then(res => res.json())
      .then(data => setExp(data));
  }, []);

  return (
    <section className="p-3">
      <h2 style={{ fontSize: '24px', textAlign: 'center' }}>Experience</h2>
      {exp.map((item, index) => (
        <div key={index}>
          <h4 style={{ fontSize: '18px' }}>{item.title}</h4>
          <p style={{ fontSize: '16px' }}>{item.company} - {item.year}</p>
        </div>
      ))}
    </section>
  );
}

export default Experience;