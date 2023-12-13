
import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Home.css';

const ResultCard = ({ result }) => {
  return (
    <div className="result-card">
      <h2 className="result-title">
        <a href={`/post/${result.objectID}`}>{result.title}</a>
      </h2>
      <p className="result-info">
        <span className="info-author">{result.author}</span>
        <span className="info-date">{new Date(result.created_at).toLocaleDateString()}</span>
        <span className="info-comments">{result.num_comments} comments</span>
        <span className="info-points">{result.points} points</span>
      </p>
      <Link to={`/post/${result.objectID}`}>
        <button className="read-more">Read More</button>
      </Link>
    </div>
  );
};

const Home = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    try {
      const { data } = await axios.get(`http://hn.algolia.com/api/v1/search?query=${query}`);
      console.log(data.hits);
      setResults(data.hits);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div>
      <div className='search-bar'>
        <input
          type="text"
          placeholder="Search Hacker News"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      <div className="result-container">
        {results.map((result) => (
          <ResultCard key={result.objectID} result={result} />
        ))}
      </div>
    </div>
  );
};

export default Home;
