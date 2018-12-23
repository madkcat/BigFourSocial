import React from 'react';
import {Link} from 'react-router';

const HomePage = () => {
  return (
    <div className="jumbotron">
      <h1>CI Version V0.5</h1>
      <p>Placeholder for scoreboard</p>
      <Link to="about" className="btn btn-primary btn-lg">Learn more</Link>
    </div>
  );
};

export default HomePage;
