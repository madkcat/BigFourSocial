import React from 'react';
import {Link} from 'react-router';

const AboutPage = () => {
  return (
    <div>
      <h1>About</h1>
      <p>Developed Primarily for the use at the Colorado Invitational (http://citournament.org/CI2018/Archive/), this site is designed so that scorekeepers can be prepared for tournaments quickly and intuitively. Designed around AACS Rules, (ref), the site is currently situated to handle scoring for the Big Four Tournaments, as well as nationals, Spectacular tournaments, and social leagues with little preparation and training new scorekeepers in as few as five minutes.

Each tournament is usually comprised of 3 teams of up to 7 quizzers, with 5 active per team and 2 in reserve. The scorekeeper is in charge of recording each quizzers correct and incorrect answers, and subject to the rules of each tournament, the other teams may also get a chance to answers. Each tournament has slightly different rules on when penalties are applied, how long quizzes can go, and how questions can be applied. This can lead to alot of confusion in the classic pen and paper approach to scorekeeping, were an F and E have very different meanings. This Site was designed to simplify the process so that any person, scorekeeper, Quizzer, and spectator, can keep score with ease, allowing them to enjoy the individual competitions further. This site was launched in Alpha for the SCQUAINT and National Competions held in South Carolina March of 2018, and will be used in Beta for the upcoming Spectacular Competitions and Big Four competitions.(http://www.biblequizzer.net/CAST/rules.html)

The Design of the site is set to track individual scores through the season, and flexible for individual coaches to track the progress of their individual quizzers through the years. There is a messaging system in place that will be rolled out in time with parental support and monitoring, as many competitors are minors, and are restricted from use of other social networking platforms. It is the hope that they will be allowed communicate in an edifying way with their peers.

For more information on Bible Quizzing, please check out http://www.biblequizzer.net/</p>
      <Link to="/" activeClassName="active">Go to Home</Link>
    </div>
  );
};

export default AboutPage;
