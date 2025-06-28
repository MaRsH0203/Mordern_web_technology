const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 8000;

app.get('/', (req, res) => {
  res.send('Welcome to my resume API!');
});

// Enable CORS so React app (port 5173) can talk to backend
app.use(cors({ origin: 'http://localhost:5173' }));

// Dummy data
const education = [
  { degree: 'B.Sc. in Computer Science', institution: 'Fictional University', year: '2020' }
];
const experience = [
  { title: 'Frontend Developer', company: 'Fictional Company', year: '2021 - Present' }
];
const overview = { summary: "I'm a passionate developer eager to build great products." };

// Endpoints
app.get('/getEdu', (req, res) => res.json(education));
app.get('/getExp', (req, res) => res.json(experience));
app.get('/getOverview', (req, res) => res.json(overview));

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));