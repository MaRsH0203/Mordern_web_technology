import React, { useEffect, useState } from 'react';

function Education() {
  const [edu, setEdu] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8000/getEdu')
      .then(res => res.json())
      .then(data => setEdu(data));
  }, []);

  return (
    <section className="p-3">
      <h2 style={{ fontSize: '24px', textAlign: 'center' }}>Education</h2>
      {edu.map((item, index) => (
        <div key={index}>
          <h4 style={{ fontSize: '18px' }}>{item.degree}</h4>
          <p style={{ fontSize: '16px' }}>{item.institution} - {item.year}</p>
        </div>
      ))}
    </section>
  );
}

export default Education;