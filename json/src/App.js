import React, { useState, useEffect } from 'react';
import './App.css'; // Import your CSS file
import Header from './Header'; // Import the Header component

function App() {
  const [internships, setInternships] = useState([]);
  const [searchTitle, setSearchTitle] = useState('');
  const [filteredInternships, setFilteredInternships] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      // Fetch JSON data
      const response = await fetch('data.json');
      const jsonData = await response.json();
      setInternships(jsonData.internships_meta);
    };

    fetchData();
  }, []);

  useEffect(() => {
    // Filter internships based on search title
    const filtered = Object.values(internships).filter(internship =>
      internship.title.toLowerCase().includes(searchTitle.toLowerCase())
    );
    setFilteredInternships(filtered);
  }, [searchTitle, internships]);

  const handleSearch = event => {
    setSearchTitle(event.target.value);
  };

  const handleApply = internshipId => {
    // Logic to handle applying for the internship
    console.log(`Applying for internship with ID: ${internshipId}`);
    if (!isLoggedIn) {
      // Redirect to login URL
      window.location.href = `http://localhost:8005/login.html`;
      // Set login state to true after redirection
      setIsLoggedIn(true);
    } else {
      // Handle the application process directly if logged in
      // This could be an API call or any other logic to apply for the internship
      console.log(`Proceeding with application for internship ID: ${internshipId}`);
    }
  };

  const handleLogout = () => {
    // Logic to handle logout
    console.log('Logging out');
    setIsLoggedIn(false);
  };

  return (
    <div className="container">
      <Header isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
      <h1>Internships</h1>
      <input
        type="text"
        placeholder="Search by title"
        value={searchTitle}
        onChange={handleSearch}
      />
      <ul>
        {filteredInternships.map(internship => (
          <li key={internship.id} className="internship-card">
            <h2>{internship.title}</h2>
            <p>Company: {internship.company_name}</p>
            <p>Duration: {internship.duration}</p>
            <p>Stipend: {internship.stipend.salary}</p>
            <button onClick={() => handleApply(internship.id)}>Apply Now</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
