import React, { useEffect, useState } from 'react';

function Overview() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch('http://localhost:8000/getOverview')
      .then(res => res.json())
      .then(data => setData(data));
  }, []);

  return (
    <section className="p-3">
      <h2 style={{ fontSize: '24px', textAlign: 'center' }}>Overview</h2>
      <p style={{ fontSize: '16px', textAlign: 'left' }}>{data?.summary}</p>
    </section>
  );
}

export default Overview;